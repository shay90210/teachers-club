//Creating functional labels for the shopping cart (Checkout/Remove Item/Total) -----------------------------------------------
let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');

//Calculation function to run everytime the items are incremented/decemented -----------------------------------------------
let basket = JSON.parse(localStorage.getItem('data')) || [];

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !==0) {
        return (ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return ` 
            <div class="cart-item">
                <img width="100" src=${img} />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="fa fa-times"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="fa fa-minus"></i>
                            <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="fa fa-plus"></i>
                    </div>
                    <p>$ ${item * search.price}</p>
                </div>
            </div>
            `
        }) 
        .join(''));
    }
    else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML =  `
        <h3>Cart is Empty</h3>
        <a href="shop.html">
            <button class="HomeBtn">Return to Shop</button>
        </a>
        `;
    }
}

generateCartItems();

// Increment Function  ----------------------------------------------------------------------------------------------------
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem('data', JSON.stringify(basket));
};

// Decrement Function ------------------------------------------------------------------------------------------------------
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);

    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();

    localStorage.setItem('data', JSON.stringify(basket));
};

// Update Function - Changes the numbers on the item cards -----------------------------------------------------------------
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id); 
    generateCartItems();
    TotalAmount();
    calculation();

    localStorage.setItem('data', JSON.stringify(basket));
};

let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}

let TotalAmount = () => {
    if(basket.length !==0) {
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x + y, 0)
        label.innerHTML = `
        <h4>Total Bill : $ ${amount}</h4>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }
    else return;
};

TotalAmount();