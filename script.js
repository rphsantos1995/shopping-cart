

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



async function cartItemClickListener(event) {
const newObj = {};
const target = event.target;
console.log("O target: ", target);
const idEvent =  target.parentElement.firstChild.innerText;
await fetch(`https://api.mercadolibre.com/items/${idEvent}`).then((item) => {
item.json().then(data => {
  const cartList = document.querySelector('.cart__items');
  if (target.className !== 'cart__item') {
  console.log(data);
  const {id, title, price, thumbnail} = data;
  newObj.sku = id;
  newObj.name = title;
  newObj.salePrice = price;
  newObj.image = thumbnail;
  cartList.appendChild(createCartItemElement(newObj));
  }
  if (target.className === 'cart__item') cartList.removeChild(target);
  
  // cartList.appendChild(newObj);

})

});

}


function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
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
      addItem ();
      
      }); 
});
};;


// requisito 2
function addItem () {
const btn = document.querySelectorAll('.item__add');
btn.forEach(item => item.addEventListener('click', cartItemClickListener));   
console.log("botao", btn);
}
 

