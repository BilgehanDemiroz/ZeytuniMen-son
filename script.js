// Menu Data
const menuData = {
  drinks: {
    title: "ZEYTUNİ",
    items: [
      { name: "rakı tek", price: "300tl" },
      { name: "rakı karar", price: "350tl" },
      { name: "rakı duble", price: "400tl" },
      { name: "beylerbeyi göbek 20cl", price: "1100tl" },
      { name: "beylerbeyi mavi 20cl", price: "1000tl" },
      { name: "beylerbeyi göbek 35cl", price: "1500tl" },
      { name: "beylerbeyi mavi 35cl", price: "1250tl" },
      { name: "beylerbeyi teragold 35cl", price: "1500tl" },
      { name: "beylerbeyi göbek 50cl", price: "1950tl" },
      { name: "beylerbeyi mavi 50cl", price: "1750tl" },
      { name: "beylerbeyi teragold 50cl", price: "1700tl" },
      { name: "beylerbeyi göbek 70cl", price: "2500tl" },
      { name: "beylerbeyi mavi 70cl", price: "2250tl" },
      { name: "beylerbeyi teragold 70cl", price: "2500tl" },
      { name: "beylerbeyi incirden 70cl", price: "2500tl" },
      { name: "beylerbeyi kalecikkarası 70cl", price: "2500tl" },
      { name: "beylerbeyi margas 70cl", price: "2500tl" },
      { name: "beylerbeyi göbek 100cl", price: "3250tl" },
      { name: "beylerbeyi mavi 100cl", price: "3000tl" },
      { name: "beylerbeyi teragold 100cl", price: "3250tl" },
      { name: "beylerbeyi incirden 100cl", price: "3250tl" },
      { name: "beylerbeyi kalecikkarası 100cl", price: "3250tl" },
      { name: "beylerbeyi margas 100cl", price: "3250tl" },
      { name: "kadeh şarap", price: "350tl" },
      { name: "şişe şarap70cl", price: "1500tl" },
      { name: "şişe şarap 25cl", price: "500tl" },
      { name: "bira", price: "200tl" },
      { name: "long drinks", price: "600tl" },
      { name: "soft içecekler", price: "100tl" },
    ],
  },
  food: {
    title: "ZEYTUNİ",
    sections: [
      {
        name: "BAŞLANGIÇLAR",
        items: [
          { name: "GÜNÜN MEZELERİ", price: "200 tl" },
          { name: "PEYNIR TABAĞI", price: "400 tl" },
          { name: "İSLİ MİDYE", price: "500 tl" },
          { name: "LAKERDA", price: "700 tl" },
          { name: "DENİZ ÜRÜNÜ SALATASI", price: "650 tl" },
          { name: "ÇİROZ", price: "600 tl" },
          { name: "HAMSİ TUZLAMA", price: "500 tl" },
          { name: "SAGANAKİ", price: "300 tl" },
        ],
      },
      {
        name: "ARA SICAKLAR",
        items: [
          { name: "PAÇANGA", price: "200 tl" },
          { name: "ARNAVUT CİĞERİ", price: "500 tl" },
          { name: "PATATES CİPSİ", price: "200 tl" },
          { name: "SİGARA BÖREĞİ", price: "200 tl" },
          { name: "KALAMAR", price: "600 tl" },
          { name: "KARİDES", price: "600 tl" },
          { name: "MANTAR DOLMA", price: "400 tl" },
        ],
      },
      {
        name: "ANA YEMEKLER",
        items: [
          { name: "KÖFTE", price: "500 tl" },
          { name: "ISOSLU IZGARA TAVUK", price: "850 tl" },
          { name: "KUZU LOKUM", price: "750 tl" },
          { name: "KUZU ŞİŞ", price: "750 tl" },
          { name: "DEMİ GLACE SOSLU ET", price: "900 tl" },
          { name: "DANA BONFİLE", price: "850 tl" },
          { name: "ANTRİKOT", price: "850 tl" },
          { name: "KUZU PİRZOLA", price: "850 tl" },
          { name: "KASAP SUCUK", price: "500 tl" },
          { name: "YAPRAK CİĞER", price: "500 tl" },
          { name: "BÖBREK", price: "500 tl" },
          { name: "KOKOREÇ", price: "500 tl" },
          { name: "TEREYAĞLI DİL", price: "500 tl" },
          { name: "SOĞUŞ DİL", price: "500 tl" },
          { name: "BEYİN", price: "450 tl" },
          { name: "BARBUN", price: "700 tl" },
          { name: "LEVREK FILETO", price: "750 tl" },
          { name: "ÇİPURA", price: "750 tl" },
        ],
      },
      {
        name: "SALATALAR",
        items: [
          { name: "MEVSİM SALATA", price: "250", portion: "350 tl" },
          { name: "ROKA SALATA", price: "250", portion: "350 tl" },
          { name: "KAŞIK SALATA", price: "250", portion: "350 tl" },
        ],
      },
      {
        name: "MEYVE-TATLI",
        items: [
          { name: "KAVUN DİLİM", price: "100 tl" },
          { name: "KARPUZ DİLİM", price: "100 tl" },
          { name: "MEYVE TABAĞI 200 300", price: "500 tl" },
          { name: "GÜNÜN TATLISI", price: "200 tl" },
        ],
      },
    ],
  },
}

// DOM Elements
const foodBtn       = document.getElementById("food-btn")
const drinksBtn     = document.getElementById("drinks-btn")
const foodMenu      = document.getElementById("food-menu")
const drinksMenu    = document.getElementById("drinks-menu")
const drinksItems   = document.getElementById("drinks-items")
const foodSections  = document.getElementById("food-sections")

// Yardımcı: fiyat metnini normalize et ve " tl" eki ekle
function formatPrice(priceStr) {
  // sonundaki "tl" ifadesini kaldır
  let clean = priceStr.replace(/\s*tl\s*$/i, '').trim()
  // sayıya dönüş ihtiyacı yoksa direkt ekle
  return clean + ' tl'
}

// Initialize the menu
function initializeMenu() {
  renderDrinksMenu()
  renderFoodMenu()

  // Add event listeners
  foodBtn.addEventListener("click", () => showCategory("food"))
  drinksBtn.addEventListener("click", () => showCategory("drinks"))
}

// Render drinks menu
function renderDrinksMenu() {
  drinksItems.innerHTML = ""

  menuData.drinks.items.forEach((item) => {
    const menuItem = document.createElement("div")
    menuItem.className = "menu-item"

    const priceText = formatPrice(item.price)

    menuItem.innerHTML = `
      <span class="item-name">${item.name}</span>
      <div class="item-price-container">
        <span class="item-price">${priceText}</span>
      </div>
    `

    drinksItems.appendChild(menuItem)
  })
}

// Render food menu
function renderFoodMenu() {
  foodSections.innerHTML = ""

  menuData.food.sections.forEach((section, index) => {
    const sectionDiv = document.createElement("div")
    sectionDiv.className = "food-section"
    sectionDiv.style.animationDelay = `${index * 0.1}s`

    const sectionTitle = document.createElement("h2")
    sectionTitle.className = "section-title"
    sectionTitle.textContent = section.name

    const itemsContainer = document.createElement("div")
    itemsContainer.className = "menu-items"

    section.items.forEach((item) => {
      const menuItem = document.createElement("div")
      menuItem.className = "menu-item"

      // Fiyatları formatla
      const itemPrice  = formatPrice(item.price)
      let priceHtml    = `<span class="item-price">${itemPrice}</span>`

      // Portion varsa onu da formatla
      if (item.portion) {
        const portionPrice = formatPrice(item.portion)
        priceHtml += `<div class="item-portion">Büyük: <span class="portion-price">${portionPrice}</span></div>`
      }

      menuItem.innerHTML = `
        <span class="item-name">${item.name}</span>
        <div class="item-price-container">
          ${priceHtml}
        </div>
      `

      itemsContainer.appendChild(menuItem)
    })

    sectionDiv.appendChild(sectionTitle)
    sectionDiv.appendChild(itemsContainer)
    foodSections.appendChild(sectionDiv)
  })
}

// Show category
function showCategory(category) {
  if (category === "food") {
    foodBtn.classList.add("active")
    drinksBtn.classList.remove("active")
    foodMenu.classList.remove("hidden")
    drinksMenu.classList.add("hidden")
  } else {
    drinksBtn.classList.add("active")
    foodBtn.classList.remove("active")
    drinksMenu.classList.remove("hidden")
    foodMenu.classList.add("hidden")
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeMenu)