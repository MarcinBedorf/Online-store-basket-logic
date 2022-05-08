const buyBtns = [...document.querySelectorAll('[data-name]')];
const basketUl = document.querySelector('.basket-list');
const buyAllBtn = document.querySelector('.btn-buy-all');


const basket = new Basket();

const removeItem = () => {
    const id = Number(event.target.dataset.id);
    basket.remove(id);
    createBasketUi();
};

const createBasketUi = () => {
    basketUl.innerText = '';

    for (const oneProductInfo of basket.getBasketSummary()) {
        const {
            id,
            text
        } = oneProductInfo;

        const newLi = document.createElement('li');
        newLi.innerText = text;
        newLi.addEventListener('click', removeItem);
        newLi.dataset.id = id;
        basketUl.appendChild(newLi);
    }

    const basketTotalValue = basket.getTotalValue();
    buyAllBtn.innerText = `Place an order for ${basketTotalValue.toFixed(2)} €`;

    if (basketTotalValue > 0) {
        buyAllBtn.disabled = false;
    } else {
        buyAllBtn.disabled = true;
    }
};



const addProductToBasket = event => {
    const name = event.target.dataset.name;
    const price = Number(event.target.dataset.price);

    const newProduct = new Product(name, price);
    basket.add(newProduct);
    createBasketUi();
};

const buyAllProducts = () => {
    const basketTotalValue = basket.getTotalValue();
    alert(`Zakupiono produkty o wartości ${basketTotalValue.toFixed(2)}zł`);
    basket.clear();
    createBasketUi();
};

for (const btn of buyBtns) {
    btn.addEventListener('click', addProductToBasket);
};



buyAllBtn.addEventListener('click', buyAllProducts);

createBasketUi();