// SHOP SCRIPT ------------------------------------------------------------------------------------------------------------
let shop = document.getElementById('shop');

// An empty array used to store the items when incredemented/decremented --------------------------------------------------
let basket = JSON.parse(localStorage.getItem('data')) || [];

// Function to render the item cards on the screen ------------------------------------------------------------------------
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
            let {id, name, price, img} = x;
            let search = basket.find((x) => x.id === id) || []; 
        return `
        <div id=product-id-${id} class="item">
            <img src=${img} alt="" width="220" />
            <div class="details">
                <h5>${name}</h5>
                <div class="price-quantity">
                    <p>$ ${price}</p>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="fa fa-minus"></i>
                            <div id=${id} class="quantity">
                                ${search.item === undefined ? 0 : search.item}
                            </div>
                        <i onclick="increment(${id})" class="fa fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
    .join (''));
};

// Invoking the function here ---------------------------------------------------------------------------------------------
generateShop();

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
    update(selectedItem.id);
    localStorage.setItem('data', JSON.stringify(basket));
    //console.log(basket);
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
    //console.log(basket);

    localStorage.setItem('data', JSON.stringify(basket));
};

// Update Function - Changes the numbers on the item cards -----------------------------------------------------------------
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

//Calculation function to run everytime the items are incremented/decemented -----------------------------------------------
let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();