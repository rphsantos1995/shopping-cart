const API_URL = "https://api.mercadolibre.com/sites/MLB/search?q=$computador";

const fetchMl = () => {
  // const myObject = {
  //   method: 'GET',
  //   headers: { 'Accept': 'application/json' }
  // };
  // .then((data) => console.log(data.results
  // .then(data => document.getElementById('items').innerText = data.map(dataRef => dataRef.title))
  const promise = fetch(API_URL);
  const obj = {};
    promise.then(response => {
      const promiseJson = response.json();
      promiseJson.then(data => { data.results.forEach((item => {
        const {id, title, thumbnail} = item;  
        obj.sku =  id;
        obj.name = title;
        obj.image = thumbnail;

        document.querySelector('.items').appendChild(createProductItemElement(obj));
      }))
  
      }); //.then(data => data.map(createProductItemElement({ id, name, image })));
    //.then(joke => document.getElementById('jokeContainer').innerText = joke.joke);
});
}

fetchMl();

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

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => { };
