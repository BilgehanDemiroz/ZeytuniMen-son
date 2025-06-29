document.addEventListener('DOMContentLoaded', () => {
  // Bootstrap yüklemesi
  (function loadBootstrap() {
    if (typeof bootstrap === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  })();

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBlrPfoO2I9RfsBtFEw9oOxEhx26d30utw",
    authDomain: "zeytuni-a01ec.firebaseapp.com",
    projectId: "zeytuni-a01ec",
    storageBucket: "zeytuni-a01ec.appspot.com",
    messagingSenderId: "742432378570",
    appId: "1:742432378570:web:82035d17ce214fe22bae33"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  // DOM
  const loginSection   = document.getElementById('login-section');
  const adminPanel     = document.getElementById('admin-panel');
  const loginForm      = document.getElementById('login-form');
  const logoutBtn      = document.getElementById('logout-btn');
  const addProductForm = document.getElementById('add-product-form');
  const productsTable  = document.getElementById('products-table');
  const saveEditBtn    = document.getElementById('save-edit-btn');

  // Hata yönetimi
  function handleError(error) {
    console.error('Hata Detayları:', error);
    let msg = 'Bir hata oluştu';
    if (error.code === 'auth/wrong-password') msg = 'Şifre yanlış!';
    else if (error.code === 'auth/user-not-found') msg = 'Kullanıcı bulunamadı!';
    else if (error.message) msg = error.message;
    alert(msg);
  }

  // Modal gösterme
  function showModalWhenReady(modalEl) {
    if (typeof bootstrap === 'undefined') {
      return setTimeout(() => showModalWhenReady(modalEl), 50);
    }
    new bootstrap.Modal(modalEl).show();
  }

  // Kullanıcı durumu
  auth.onAuthStateChanged(user => {
    if (user && user.email === 'bilgehandemiroz7@gmail.com') {
      loginSection.style.display = 'none';
      adminPanel.style.display = 'block';
      loadProducts();
    } else {
      loginSection.style.display = 'block';
      adminPanel.style.display = 'none';
    }
  });
   auth.onAuthStateChanged(user => {
    if (user && user.email === 'sarikayasudenaz59@gmail.com') {
      loginSection.style.display = 'none';
      adminPanel.style.display = 'block';
      loadProducts();
    } else {
      loginSection.style.display = 'block';
      adminPanel.style.display = 'none';
    }
  });

  // Giriş
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      const email = loginForm.email.value;
      const pass = loginForm.password.value;
      await auth.signInWithEmailAndPassword(email, pass);
    } catch (err) {
      handleError(err);
    }
  });

  // Çıkış
  logoutBtn.addEventListener('click', () => auth.signOut().catch(handleError));

  // Ürün ekle
  addProductForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      name: addProductForm['product-name'].value,
      price: addProductForm['product-price'].value.trim().toString(),
      category: addProductForm['product-category'].value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: auth.currentUser.email
    };
    try {
      await db.collection('products').add(data);
      addProductForm.reset();
      loadProducts();
      alert('Ürün eklendi!');
    } catch (err) {
      handleError(err);
    }
  }); 

  // Ürünleri getir
  async function loadProducts() {
    productsTable.innerHTML = `
      <tr><td colspan="4" class="text-center py-4">
        <div class="spinner-border text-primary" role="status"></div>
      </td></tr>`;
    try {
      const snapshot = await db.collection('products')
        .orderBy('createdAt', 'desc')
        .get();

      if (snapshot.empty) {
        productsTable.innerHTML = `
          <tr><td colspan="4" class="text-center py-4">Henüz ürün yok</td></tr>`;
        return;
      }

      productsTable.innerHTML = '';
      snapshot.forEach(doc => {
        const p = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${p.name}</td>
          <td>${p.price} ₺</td>
          <td>${p.category}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" data-id="${doc.id}" data-action="edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" data-id="${doc.id}" data-action="delete">
              <i class="fas fa-trash"></i>
            </button>
          </td>`;
        productsTable.appendChild(row);
      });
    } catch (err) {
      handleError(err);
    }
  }

  // Tablo tıklamaları
  productsTable.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const { id, action } = btn.dataset;
    if (action === 'delete') deleteProduct(id);
    else if (action === 'edit') openEditModal(id);
  });

  // Silme
  async function deleteProduct(id) {
    if (!confirm('Silmek istediğine emin misin?')) return;
    try {
      await db.collection('products').doc(id).delete();
      loadProducts();
    } catch (err) {
      handleError(err);
    }
  }

  // Modal aç
  async function openEditModal(id) {
    try {
      const doc = await db.collection('products').doc(id).get();
      if (!doc.exists) throw new Error('Ürün bulunamadı');
      const p = doc.data();
      document.getElementById('edit-product-id').value = id;
      document.getElementById('edit-product-name').value = p.name;
      document.getElementById('edit-product-price').value = p.price;
      document.getElementById('edit-product-category').value = p.category;
      showModalWhenReady(document.getElementById('editModal'));
    } catch (err) {
      handleError(err);
    }
  }

  // Kaydet
  saveEditBtn.addEventListener('click', async () => {
    const id = document.getElementById('edit-product-id').value;
    const data = {
      name: document.getElementById('edit-product-name').value,
      price: document.getElementById('edit-product-price').value.trim().toString(),
      category: document.getElementById('edit-product-category').value,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    try {
      await db.collection('products').doc(id).update(data);
      if (bootstrap) {
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
      }
      loadProducts();
      alert('Güncellendi!');
    } catch (err) {
      handleError(err);
    }
  });
});
