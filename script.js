'use strict';

// initializam elementele
const payAmountBtn = document.querySelector('#payAmount');
const decrementBtns = document.querySelectorAll('#decrement');
const quantityElems = document.querySelectorAll('#quantity');
const incrementBtns = document.querySelectorAll('#increment');

const decrementBtn2 = document.querySelector('#decrement2');
const quantityElem2 = document.querySelector('#quantity2');
const incrementBtn2 = document.querySelector('#increment2');

const priceElems = document.querySelectorAll('#price');
const priceElem2 = document.querySelector('#price2');
const subtotalElem = document.querySelector('#subtotal');
const taxElem = document.querySelector('#tax');
const totalElem = document.querySelector('#total');
 
// daca sunt mai mult de 30 de borcane
function updateQuantityButtons() {
  const quantity1 = parseInt(document.getElementById("quantity1").textContent);
  const quantity2 = parseInt(document.getElementById("quantity2").textContent);

  if (quantity1 + quantity2 > 28) {
    document.querySelectorAll('#increment, #increment2').forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = 0.5;
    });
  } else {
    document.querySelectorAll('#increment, #increment2').forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = 1;
    });
  }
}

// Call the updateQuantityButtons function when the page loads and whenever a quantity is changed
document.addEventListener("DOMContentLoaded", updatePrices);
document.querySelectorAll('#quantity1, #quantity2, #increment, #decrement, #increment2, #decrement2').forEach(elem => {
  elem.addEventListener("click", updateQuantityButtons);
});

// adaugam si eliminam borcane din cos cu + si -
let quantity1 = sessionStorage.getItem('quantity1') || 1;
let quantity2 = sessionStorage.getItem('quantity2') || 1;

document.getElementById('quantity1').textContent = quantity1;
document.getElementById('quantity2').textContent = quantity2;

incrementBtns[0].addEventListener('click', function () {
  quantity1++;
  document.getElementById('quantity1').textContent = quantity1;
  sessionStorage.setItem('quantity1', quantity1);
  totalCalc();
});

decrementBtns[0].addEventListener('click', function () {
  quantity1 = Math.max(1, quantity1 - 1);
  document.getElementById('quantity1').textContent = quantity1;
  sessionStorage.setItem('quantity1', quantity1);
  totalCalc();
});

incrementBtn2.addEventListener('click', function () {
  quantity2++;
  document.getElementById('quantity2').textContent = quantity2;
  sessionStorage.setItem('quantity2', quantity2);
  totalCalc();
});

decrementBtn2.addEventListener('click', function () {
  quantity2 = Math.max(1, quantity2 - 1);
  document.getElementById('quantity2').textContent = quantity2;
  sessionStorage.setItem('quantity2', quantity2);
  totalCalc();
});


const totalCalc = function () {
  let subtotal = 0;
  let totalTax = 0;
  let total = 0;

  for (let i = 0; i < quantityElems.length; i++) {
    subtotal += Number(quantityElems[i].textContent) * Number(priceElems[i].textContent);
  }

  subtotal += Number(quantityElem2.textContent) * Number(priceElem2.textContent);

  subtotalElem.textContent = subtotal.toFixed(2);
  taxElem.textContent = totalTax.toFixed(2);
  total = subtotal + totalTax;
  totalElem.textContent = total.toFixed(2);
  payAmountBtn.textContent = total.toFixed(2);
};

// Modificam costurile in functie de cate borcane de miere sunt in cos
function updatePrices() {
  const quantity1 = parseInt(document.getElementById("quantity1").textContent);
  const price1 = parseFloat(document.getElementById("price1").textContent);
  const quantity2 = parseInt(document.getElementById("quantity2").textContent);
  const price2 = parseFloat(document.getElementById("price2").textContent);
  let shippingCost = 30;
  let subtotal = quantity1 * price1 + quantity2 * price2;
  let total = subtotal + shippingCost;
  let quantity = quantity1 + quantity2;
  
  subtotal = quantity1 * price1 + quantity2 * price2;
  total = subtotal + shippingCost;
  document.getElementById("shipping").textContent = shippingCost.toFixed(2) ;
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2) ;
  
}

document.addEventListener("DOMContentLoaded", updatePrices);
document.getElementById("quantity1").addEventListener("change", updatePrices);
document.getElementById("quantity2").addEventListener("change", updatePrices);
document.getElementById("increment").addEventListener("click", updatePrices);
document.getElementById("decrement").addEventListener("click", updatePrices);
document.getElementById("increment2").addEventListener("click", updatePrices);
document.getElementById("decrement2").addEventListener("click", updatePrices);



// daca cosul este gol
let shippingElement = document.querySelector('#shipping');
let shipping = parseFloat(shippingElement.textContent);
let emptyCartMessage = document.querySelector('.empty-cart-message');
let subtotalElement = document.querySelector('#subtotal');
let totalElement = document.querySelector('#total');
let productCard = document.querySelector('.product-card');
let productCard2 = document.querySelector('.product-card2');
let priceElement1 = document.querySelector('#price1');
let priceElement2 = document.querySelector('#price2');
let quantityElement1 = document.querySelector('#quantity1');
let quantityElement2 = document.querySelector('#quantity2');

function checkCartEmpty() {
  const computedStyle1 = getComputedStyle(productCard);
  const computedStyle2 = getComputedStyle(productCard2);
  if (computedStyle1.display === "none" && computedStyle2.display === "none") {
    total = 0;
    shipping = 0;
    totalElement.textContent = total.toFixed(2);
    shippingElement.textContent = shipping.toFixed(2);
    emptyCartMessage.style.display = "block";
    document.getElementById("comandaBtn").disabled = true;
  } else {
    document.getElementById("comandaBtn").disabled = false;
  }
}


let subtotal = parseFloat(subtotalElement.textContent);
let total = parseFloat(totalElement.textContent);

let closeBtn = document.querySelector('.product-close-btn');

closeBtn.addEventListener('click', function() {
  let price2 = parseFloat(priceElement2.textContent);
  let quantity2 = parseInt(quantityElement2.textContent);

  subtotal = price2 * quantity2;
  total = price2 * quantity2 + shipping;
  quantityElement1.textContent = quantityElement1.dataset.initialQuantity;
  subtotalElement.textContent = subtotal.toFixed(2);
  totalElement.textContent = total.toFixed(2);
  productCard.style.display = "none";
  checkCartEmpty();
});

let closeBtn2 = document.querySelector('.product-close-btn2');

closeBtn2.addEventListener('click', function() {
  let price1 = parseFloat(priceElement1.textContent);
  let quantity1 = parseInt(quantityElement1.textContent);

  subtotal = price1 * quantity1;
  total = price1 * quantity1 + shipping;
  quantityElement2.textContent = quantityElement2.dataset.initialQuantity;
  subtotalElement.textContent = subtotal.toFixed(2);
  totalElement.textContent = total.toFixed(2);
  productCard2.style.display = "none";
  checkCartEmpty();
});



// validator pentru datele de livrare in momentul cand apesi pe butonul Comandă acum
const phoneInputt = document.getElementById("nrtel");
const errorContainer = document.getElementById("error-container");

phoneInputt.addEventListener("input", () => {
  validateForm();
});

function validateForm() {
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value.trim();
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();
  const addressInput = document.getElementById("adresa");
  const addressValue = addressInput.value.trim();
  const phoneInput = document.getElementById("nrtel");
  const phoneValue = phoneInput.value.trim();
  const errorContainer = document.getElementById("error-container");
  const checkbox = document.getElementById('js-accept-terms');
  const price1Element = document.getElementById('price1');
  const price2Element = document.getElementById('price2');
  const errorPrice1Element = document.getElementById('error-price1');
  const errorPrice2Element = document.getElementById('error-price2');
  const price1 = parseFloat(price1Element.textContent);
  const price2 = parseFloat(price2Element.textContent);
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');

  if (price1 < 0) {
    errorPrice1Element.textContent = 'Eroare: Prețul 1 este invalid.';
    errorPrice1Element.style.color = "red";
    document.getElementById("comandaBtn").disabled = true;
    subtotalElement.textContent = 'Error';
    shippingElement.textContent = 'Error';
    totalElement.textContent = 'Error';
  }

  if (price2 < 0) {
    errorPrice2Element.textContent = 'Eroare: Prețul 2 este invalid.';
    errorPrice2Element.style.color = "red";
    document.getElementById("comandaBtn").disabled = true;
    subtotalElement.textContent = 'Error';
    shippingElement.textContent = 'Error';
    totalElement.textContent = 'Error';
  }

  if(price1 < 0 || price2 < 0 ){
    document.getElementById("comandaBtn").disabled = true;
    subtotalElement.textContent = 'Error';
    shippingElement.textContent = 'Error';
    totalElement.textContent = 'Error';
  }

  if (!checkbox.checked) {
    if (!errorContainer.firstChild) {
      const errorText = document.createElement("p");
      errorText.innerText = "Trebuie să bifați termenii și condițiile pentru a putea comanda.";
      errorText.style.color = "red";
      errorText.id = "error-message";
      errorContainer.appendChild(errorText);
    }
    return false;
  } else {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorContainer.removeChild(errorMessage);
    }
  }

  if (
    nameValue === "" ||
    emailValue === "" ||
    addressValue === "" ||
    phoneValue === "" ||
    phoneValue.length !== 10
  ) {
    if (!errorContainer.firstChild) {
      const errorText = document.createElement("p");
      errorText.innerText =
        "Vă rugăm completați toate câmpurile corect, inclusiv numărul de telefon care trebuie să fie format din 10 cifre!";
      errorText.style.color = "red";
      errorContainer.appendChild(errorText);
    }
    return false;
  } else {
    if (errorContainer.firstChild) {
      errorContainer.removeChild(errorContainer.firstChild);
    }
    
    var input1 = document.getElementById("floarea-soarelui").value;
    var quantity1 = document.getElementById("quantity1").textContent;
    var input2 = document.getElementById("poliflora").value;
    var quantity2 = document.getElementById("quantity2").textContent;
    
    if (input1 !== quantity1 || input2 !== quantity2) {
      var errorDiv = document.getElementById("error");
      errorDiv.innerHTML = "Vă rugăm să introduceți o valoare validă pentru câte borcane doriți să cumpărați.";
      errorDiv.style.color = "red";
      return false;
    } else {
      var errorDiv = document.getElementById("error");
      errorDiv.innerHTML = "";
    }

    if (input1 === "0" && input2 === "0") {
      var errorDiv = document.getElementById("error");
      errorDiv.innerHTML = "Vă rugăm să introduceți o valoare validă pentru câte borcane doriți să cumpărați.";
      errorDiv.style.color = "red";
      return false;
    } else {
      var errorDiv = document.getElementById("error");
      errorDiv.innerHTML = "";
    }
    

  }

  return true;
}

// folosim sessionStorage ca să păstrăm ce a scris utilizatorul la contact
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('adresa');
const phoneInput = document.getElementById('nrtel');

nameInput.addEventListener('input', () => {
  sessionStorage.setItem('name', nameInput.value);
});

emailInput.addEventListener('input', () => {
  sessionStorage.setItem('email', emailInput.value);
});

addressInput.addEventListener('input', () => {
  sessionStorage.setItem('adresa', addressInput.value);
});

phoneInput.addEventListener('input', () => {
  sessionStorage.setItem('nrtel', phoneInput.value);
});


window.addEventListener('load', () => {
  nameInput.value = sessionStorage.getItem('name') || '';
  emailInput.value = sessionStorage.getItem('email') || '';
  addressInput.value = sessionStorage.getItem('adresa') || '';
  phoneInput.value = sessionStorage.getItem('nrtel') || '';
});

// la nr de tel sa putem pune doar cifre
function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  
  var input = document.getElementById("nrtel").value;
  if (input.length !== 10) {
    document.getElementById("comandaBtn").disabled = true;
  } else {
    document.getElementById("comandaBtn").disabled = false;
  }
  
  return true;
}


const tooltip = document.querySelector('.tooltip');
  const input = document.getElementById('nrtel');

  tooltip.addEventListener('mouseover', () => {
    input.focus();
    input.blur();
    input.focus();
  });

  tooltip.addEventListener('mouseout', () => {
    input.blur();
  });

  function isNumberKeyy(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }

























