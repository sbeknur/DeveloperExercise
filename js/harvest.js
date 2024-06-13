// LIST

const data = [
    {
        link: "#chair.html",
        title: "Slim PRO",
        desc: "Cтул Slim PRO предназначено не только для работы за компьютером, но и для дополнения антуража помещения. Красиво выполненная конструкция не только изысканно смотрится.",
        price: "83000",
        img: "images/stul_kresla/SlimPRO.png",
        code: "6702",
        parent: "computer",
        category: "computer_chair",
    },
    {
        link: "#chair.html",
        title: "Slim",
        desc: "Изящные, легкие, универсальные и эргономичные кресла Slim подойдут для кабинета руководителя. А различные модификации этой серии позволят оформить в едином стиле различные зоны офиса.",
        price: "79000",
        img: "images/stul_kresla/slim.png",
        code: "6101",
        parent: "computer",
        category: "computer_chair",
    },
    {
        link: "#chair.html",
        title: "Slim DC",
        desc: "Кресло Slim DC - это офисное кресло для руководителя спинка и сидение которого выполнена из из мягкой сетки.",
        price: "134100",
        img: "images/stul_kresla/GloryDC.png",
        code: "6987",
        parent: "computer",
        category: "computer_chair",
    },
    {
        link: "#chair.html",
        title: "Hi-tech",
        desc: "Модель Hi-tech изготовлена в модном дизайне, а значит, будет отлично смотреться в любом современном интерьере.",
        price: "95500",
        img: "images/stul_kresla/Hi-tech.png",
        code: "6203",
        parent: "computer",
        category: "computer_chair",
    },
    {
        link: "#chair.html",
        title: "Hi-tech PRO",
        desc: "Профилированная спинка – спинка, имеет анатомически правильную форму, повторяющую естественный изгиб позвоночника.",
        price: "125000",
        img: "images/stul_kresla/Hi-techPRO.png",
        code: "6057",
        parent: "computer",
        category: "computer_chair",
    },
    {
        link: "#chair.html",
        title: "Prestige DC",
        desc: "Утонченность и функциональность, высокое качество обивочных материалов и комплектующих – сочетание, достойное современного офисного кресла.",
        price: "122000",
        img: "images/stul_kresla/PrestigeDC.png",
        code: "6041",
        parent: "computer",
        category: "computer_chair",
    },
    {
        link: "#chair.html",
        title: "Comfort DC",
        desc: "Многоцелевое кресло нового поколения, олицетворяет новые стандарты простоты, универсальной применимости, качества и комфорта.",
        price: "97610",
        img: "images/stul_kresla/ComfortDC.png",
        code: "6807",
        parent: "computer",
        category: "computer_chair",
    },
];

let computerChairList = document.getElementById('computerChairList_____SHOW');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function formatterCart(priceSum) {
    let price = priceSum.toString();
    let formattedPrice = "";
    for (let i = 0; i < price.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedPrice = " " + formattedPrice;
        }
        formattedPrice = price[price.length - 1 - i] + formattedPrice;
    }
    return formattedPrice;
}

function updateCartIcon() {
    const cartIconNumber = document.querySelector('.open_cart_number');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIconNumber.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.code === item.code);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }
    saveCart();
    updateCartIcon();
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('product_item_price_btn')) {
        const code = event.target.getAttribute('data-code');
        const item = data.find(product => product.code === code);
        addToCart(item);
    }
});

// DISPLAY
function displayList(array, uniqId) {
    uniqId.innerHTML = "";
    array.forEach((a) => {
        let productItem = document.createElement('div');
        productItem.classList.add("product_item");
        productItem.innerHTML = `
        <a class="product_item_content" href="${a.link}">
            <img class="product_item_img" src="${a.img}" alt="Product">
            <div class="product_item_text">
                <h5>${a.title} | code: ${a.code}</h5>
                <p>${a.desc}</p>
            </div>
        </a>
        <div class="product_item_price">
            <span class="product_item_price_text">Цена:</span>
            <br>
            <span class="product_item_price_cost">${formatterCart(a.price)} <span class="product_item_price_par">₸</span> </span>
            <a class="product_item_price_btn" data-code="${a.code}">В корзину</a>
        </div>
        `;
        uniqId.appendChild(productItem);
    });
}

updateCartIcon();
displayList(data, computerChairList);

// SORT
document.getElementById('sorting_option').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const sortValue = event.target.getAttribute('data-value');
        let sortedData;

        switch (sortValue) {
            case 'priceAsc':
                sortedData = [...data].sort((a, b) => parseInt(a.price) - parseInt(b.price));
                break;
            case 'priceDesc':
                sortedData = [...data].sort((a, b) => parseInt(b.price) - parseInt(a.price));
                break;
            case 'code':
                sortedData = [...data].sort((a, b) => a.code.localeCompare(b.code));
                break;
            case 'name':
                sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                sortedData = data;
        }

        displayList(sortedData, computerChairList);
    }
});
