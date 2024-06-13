let btnLocation = document.getElementById("open_cart_btn");

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
    const cartIconNumber = document.querySelector(".open_cart_number");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIconNumber.textContent = totalItems;
}

btnLocation.addEventListener("click", function () {
    const divElement = document.createElement("div");
    divElement.classList.add("jqcart_layout");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        let cartContent = cart
            .map(
                (item) => `
            <ul class="jqcart_tbody" data-id="${item.code}">
                <li class="jqcart_small_td">
                    <img src="${item.img}" alt="Img">
                </li>
                <li>
                    <div class="jqcart_nd">
                        <a href="${item.link}">${item.title}</a>
                    </div>
                </li>
                <li class="jqcart_price">${formatterCart(item.price)}</li>
                <li>
                    <div class="jqcart_pm">
                        <input type="text" class="jqcart_amount" value="${item.quantity}">
                        <span class="jqcart_incr" data-incr="1">
                            <i class="fa fa-angle-up" aria-hidden="true"></i>
                        </span>
                        <span class="jqcart_incr" data-incr="-1">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                </li>
                <li class="jqcart_sum">${formatterCart(item.price * item.quantity)} тг</li>
            </ul>
        `
            )
            .join("");

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        divElement.innerHTML = `
            <div class="jqcart_content">
                <div class="jqcart_table_wrapper">
                    <div class="jqcart_manage_order">
                        <ul class="jqcart_thead">
                            <li></li>
                            <li>ТОВАР</li>
                            <li>ЦЕНА</li>
                            <li>КОЛИЧЕСТВО </li>
                            <li>СТОИМОСТЬ</li>
                        </ul>
                        ${cartContent}
                    </div>
                </div>
                <div class="jqcart_manage_block">
                    <div class="jqcart_btn">
                        <button class="jqcart_open_form_btn">Оформить заказ</button>
                        <form class="jqcart_order_form" style="opacity: 0">
                            <input class="jqcart_return_btn" type="reset" value="Продолжить покупки">
                        </form>
                    </div>
                    <div class="jqcart_subtotal">Итого: <strong>${formatterCart(totalPrice)}</strong> тг</div>
                </div>
            </div>
        `;

        document.body.appendChild(divElement);

        document.querySelector(".jqcart_layout").addEventListener("click", function (event) {
            if (event.target.classList.contains("jqcart_layout")) {
                document.querySelector(".jqcart_layout").remove();
            }
        });

        document.querySelectorAll(".jqcart_incr").forEach((button) => {
            button.addEventListener("click", function () {
                const code = this.closest(".jqcart_tbody").getAttribute("data-id");
                const incr = parseInt(this.getAttribute("data-incr"));
                const item = cart.find((cartItem) => cartItem.code === code);
                if (item) {
                    item.quantity += incr;
                    if (item.quantity <= 0) {
                        cart = cart.filter((cartItem) => cartItem.code !== code);
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                    updateCartIcon();
                }
            });
        });
    }

    renderCart();
});
