const newObj = {};

function selectAllItems() {
  const cartItems = document.querySelectorAll('.cart__item');
  return cartItems;
}

function selectCartList() {
  const cartListItem = document.querySelector('.cart__items');
  return cartListItem;
}

function sumAllValuesonLoad() {
  // const list = selectAllItems();
  //   const result = [];
  //   list.forEach((item) => {
  //     const currentPriceValue = parseInt(item.innerHTML.split('$').pop().split('<')[0]);
  //     result.push(currentPriceValue);
  //   });
  //   let refreshLocalPrice;
  //   (list.length !== 0) ? refreshLocalPrice = result.reduce((a, b) => a + b): refreshLocalPrice = 0;
  //   console.log('preço total no f5 ', refreshLocalPrice);
  //   let totalPriceHolder = document.querySelector('.total-price');
  //   totalPriceHolder.innerHTML = refreshLocalPrice;
  //   localStorage.setItem('totalPrice', JSON.stringify(refreshLocalPrice));  
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  const cartList = selectCartList();
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', (eve2) => {
  cartList.removeChild(eve2.target);
  localStorage.setItem('cartItemsLocal', JSON.stringify(cartList.innerHTML));
  });
  return li;
}
async function cartItemClickListener(event) {
  const idEvent = event.target.parentElement.firstChild.innerText;
  await fetch(`https://api.mercadolibre.com/items/${idEvent}`).then((item) => {
  item.json().then((data) => { 
    const cartList = selectCartList();
    const { id, title, price, thumbnail } = data;
    newObj.sku = id;
    newObj.name = title;
    newObj.salePrice = price;
    newObj.image = thumbnail;
    cartList.appendChild(createCartItemElement(newObj));
    const cartItemsLocal = cartList.innerHTML;
    localStorage.setItem('cartItemsLocal', JSON.stringify(cartItemsLocal));
  });
  });
  }
  
  function removeItemonClick() {
    const list = selectAllItems();
    const cartList = selectCartList();
    list.forEach((item) => item.addEventListener('click', (eve) => {
      cartList.removeChild(eve.target);
      localStorage.setItem('cartItemsLocal', JSON.stringify(cartList.innerHTML));
    }));
  }
  
const carregarCarinhoOnLoad = () => {
  const btn = document.querySelectorAll('.item__add');
    const cartList = selectCartList();
    btn.forEach((item) => item.addEventListener('click', cartItemClickListener));
    const myItems = localStorage.getItem('cartItemsLocal');
    cartList.innerHTML = JSON.parse(myItems);
    removeItemonClick();
};

function clearList() {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', () => {
    const lis = document.querySelectorAll('li');
    lis.forEach((li) => li.remove());
  });
}

window.onload = async () => {
  const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const obj = {};
  await fetch(API_URL).then((response) => { 
      response.json().then((data) => { 
        data.results.map((item) => {
        const { id, title, thumbnail } = item;  
        obj.sku = id;
        obj.name = title;
        obj.image = thumbnail;
        document.querySelector('.items').appendChild(createProductItemElement(obj));
       return obj;
      });
      carregarCarinhoOnLoad();
      clearList();
  }); 
});
};
