
let btnLocation = document.getElementById('open_cart_btn');

function formatterCart (priceSum) {
    let price = priceSum.toString();
    let formattedPrice = '';
    for (let i = 0; i < price.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedPrice = ' ' + formattedPrice;
        }
        formattedPrice = price[price.length - 1 - i] + formattedPrice;
    }
    return formattedPrice;
};

btnLocation.addEventListener('click', function () {

    const divElement = document.createElement('div');

    divElement.classList.add('jqcart_layout');

    divElement.innerHTML = `
        <div class="jqcart_content">
            <div class="jqcart_table_wrapper">
                <div class="jqcart_manage_order">
                
                    <ul class="jqcart_thead">
                        <li></li>
                        <li>ТОВАР</li>
                        <li></li>
                        <li>ЦЕНА</li>
                        <li>КОЛИЧЕСТВО </li>
                        <li>СТОИМОСТЬ</li>
                    </ul>
                    
                    <ul class="jqcart_tbody" data-id="4561">
                        <li class="jqcart_small_td">
                            <img src="images/stul_kresla/GloryDC.png" alt="Img">
                        </li>
                        <li>
                            <div class="jqcart_nd">
                                <a href="#chair.html">Slim DC</a>
                            </div>
                        </li>
                        <li></li>
                        <li class="jqcart_price">83 000</li>
                        <li>
                            <div class="jqcart_pm">
                                <input type="text" class="jqcart_amount" value="2">
                                <span class="jqcart_incr" data-incr="1">
                                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                                </span>
                                <span class="jqcart_incr" data-incr="-1">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </div>
                        </li>
                        <li class="jqcart_sum">166 000 тг</li>
                    </ul>
                    
                    <ul class="jqcart_tbody" data-id="6203">
                        <li class="jqcart_small_td">
                            <img src="images/stul_kresla/Hi-tech.png" alt="Img">
                        </li>
                        <li>
                            <div class="jqcart_nd">
                                <a href="#chair.html">Hi-tech</a>
                            </div>
                        </li>
                        <li></li>
                        <li class="jqcart_price">95 500</li>
                        <li>
                            <div class="jqcart_pm">
                                <input type="text" class="jqcart_amount" value="1">
                                <span class="jqcart_incr" data-incr="1">
                                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                                </span>
                                <span class="jqcart_incr" data-incr="-1">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </div>
                        </li>
                        <li class="jqcart_sum">95 500 тг</li>
                    </ul>
                    
                </div>
            </div>
            
            <div class="jqcart_manage_block">
                <div class="jqcart_btn">
                    <button class="jqcart_open_form_btn">Оформить заказ</button>
                    <form class="jqcart_order_form" style="opacity: 0">
                        <input class="jqcart_return_btn" type="reset" value="Продолжить покупки">
                    </form>
                </div>
                <div class="jqcart_subtotal">Итого: <strong>261 500</strong> тг</div>
            </div>
            
        </div>
    `;

    document.body.appendChild(divElement);

    document.querySelector('.jqcart_layout').addEventListener('click', function () {
        document.querySelector('.jqcart_layout').remove();
    });

});