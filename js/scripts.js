const mainDishes = document.getElementById('mainDishes');
const sideDishes = document.getElementById('sideDishes');

let formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

$('#phone').mask('(00) 0000-00000')

const mainDishesProducts = {
  1: {
    id: 1,
    name: 'Bife com batatas',
    image: './assets/bife.jpg',
    price: '30'
  },
  2: {
    id: 2,
    name: 'Coxa de frango crocante',
    image: './assets/coxa.jpg',
    price: '25'
  },
  3: {
    id: 3,
    name: 'Carne de panela',
    image: './assets/panela.jpg',
    price: '22'
  }
}

const sideDishesProducts = {
  4: {
    id: 4,
    name: 'Farofa',
    image: './assets/farofa.jpg',
    price: '10'
  },
  5: {
    id: 5,
    name: 'Salada',
    image: './assets/salad.jpg',
    price: '8'
  },
  6: {
    id: 6,
    name: 'Torresmo',
    image: './assets/torresmo.jpg',
    price: '12'
  }
}

Object.keys(mainDishesProducts).forEach((key) => {
  mainDishes.innerHTML += `
      <div class="w-100 m-lg-5 d-flex flex-column justify-content-center align-items-center rounded-3 shadow mt-3 mb-3 p-3 text-center" id="${mainDishesProducts[key].id}">
        <div class="w-100 h-75">
            <img class="img-fluid w-100 h-100" src="${mainDishesProducts[key].image}" alt="${mainDishesProducts[key].name}">
        </div>
        <p class="fs-6 fw-bolder my-1">${mainDishesProducts[key].name}</p>
        <p class="fs-4 fw-bolder my-1 text-success price">${formatter.format(mainDishesProducts[key].price)}</p>
        <div class="quantity buttons_added">
            <input type="button" value="-" class="minus">
              <input id="${mainDishesProducts[key].id}" type="number" step="1" min="0" max="" name="quantity" value="0" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
            <input type="button" value="+" class="plus">
        </div>
      </div>
  `
})

Object.keys(sideDishesProducts).forEach((key) => {
  sideDishes.innerHTML += `
      <div class="w-100 m-lg-5 d-flex flex-column justify-content-center align-items-center rounded-3 shadow mt-3 mb-3 p-3 text-center" id="${sideDishesProducts[key].id}">
        <div class="w-100 h-75">
            <img class="img-fluid w-100 h-100" src="${sideDishesProducts[key].image}" alt="${sideDishesProducts[key].name}">
        </div>
        <p class="fs-6 fw-bolder my-1">${sideDishesProducts[key].name}</p>
        <p class="fs-4 fw-bolder my-1 text-success price">${formatter.format(sideDishesProducts[key].price)}</p>
        <div class="quantity buttons_added">
            <input type="button" value="-" class="minus">
              <input id="${sideDishesProducts[key].id}" type="number" step="1" min="0" max="" name="quantity" value="0" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
            <input type="button" value="+" class="plus">
        </div>
      </div>
  `
})

function getProductsAndQuantities() {
  const quantitiesAndProducts = document.getElementsByName("quantity");
  const buyedProducts = []

  quantitiesAndProducts.forEach((quantity) => {
    const quantityInt = parseInt(quantity.value)
    if (quantityInt > 0) {
      if (mainDishesProducts.hasOwnProperty(quantity.id)) {
        mainDishesProducts[quantity.id]['quantity'] = quantityInt
        buyedProducts.push(mainDishesProducts[quantity.id])
      }
      if (sideDishesProducts.hasOwnProperty(quantity.id)) {
        sideDishesProducts[quantity.id]['quantity'] = quantityInt
        buyedProducts.push(sideDishesProducts[quantity.id])
      }
    }
  })

  return buyedProducts;
}

function createTable() {
  const shoppingCart = document.getElementById("shoppingCart");
  const name = document.getElementById("name").value;

  shoppingCart.innerHTML = `
    <p class="fs-5 mt-5">Caro <strong>${name}</strong></p>
    <p class="fs-5 mb-5">Seguem os dados do seu pedido:</p>
    <table class="table" id="buyedProductsTable">
        <tr>
            <th>Prato</th>
            <th class="d-none d-md-table-cell">Preço Unitário</th>
            <th>Quantidade</th>
            <th>Total</th>
        </tr>
    </table>
  `
}

function insertProductsOnTable(buyedProducts) {
  const buyedProductsTable = document.getElementById("buyedProductsTable");
  let totalShopping = 0;

  buyedProducts.forEach((product) => {
    let totalProduct = product.quantity * product.price;
    totalShopping += totalProduct;

    buyedProductsTable.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td class="d-none d-md-table-cell">${formatter.format(product.price)}</td>
        <td>${product.quantity}</td>
        <td>${formatter.format(totalProduct)}</td>
      </tr>
    `
  })

  const shoppingCart = document.getElementById("shoppingCart");
  shoppingCart.innerHTML += `
    <p class="fs-5 fw-bolder my-5">Preço Final: ${formatter.format(totalShopping)}</p>
    <button class="btn btn-primary mt-4 w-100" id="btnLimpar">LIMPAR SELEÇÃO</button>
  `
}

function resetQuantitiesAndForm() {
  const quantitiesAndProducts = document.getElementsByName("quantity");
  quantitiesAndProducts.forEach((input) => {
    input.value = "0"
  })

  const form = document.getElementById("formPersonalData");
  form.reset()

  const shoppingCart = document.getElementById("shoppingCart");
  shoppingCart.innerHTML = "";
}

function addEventListenerLimpar() {
  const btnLimpar = document.getElementById("btnLimpar");
  btnLimpar.addEventListener("click", (event) => {
    event.preventDefault();

    resetQuantitiesAndForm();
  });
}

const btnCalcular = document.getElementById("btnCalcular");
btnCalcular.addEventListener("click", (event) => {
  event.preventDefault();

  const buyedProducts = getProductsAndQuantities();

  if (buyedProducts.length > 0) {
    createTable();
    insertProductsOnTable(buyedProducts);
  }

  addEventListenerLimpar();

})