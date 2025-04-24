// Бургер-меню
let unlock = true;
const header__burger = document.querySelector(".header__burger");

if (header__burger) {
    const header__menu = document.querySelector(".header__menu");
    const body = document.querySelector("body");

    // Открытие/закрытие меню при клике на бургер
    header__burger.addEventListener("click", function () {
        if (unlock) {
            body_lock();
            header__burger.classList.toggle("_active");
            header__menu.classList.toggle("_active");
        }
    });

    // Закрытие меню при клике на пункт меню
    header__menu.addEventListener("click", function () {
        if (body.classList.contains('_lock')) {
            body.classList.remove("_lock");
        }
        header__burger.classList.remove("_active");
        header__menu.classList.remove("_active");
    });
}

// Блокировка/разблокировка скролла при открытом меню
function body_lock() {
    let body = document.querySelector("body");
    body.classList.toggle("_lock");
}

// Скрытие/показ хедера при прокрутке
const header = document.querySelector('.header');
let lastScroll = 0;
const defaultOffset = 72;

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        header.classList.add('hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
        header.classList.remove('hide');
    }
    lastScroll = scrollPosition();
});

// Копирование текста в буфер обмена
function copyToClipboard() {
    const textToCopy = document.querySelector('.booking_erip').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Текст скопирован в буфер обмена');
}

// Отображение имени загруженного файла в форме
document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.custom-file-input-field');
    const fileNameSpan = document.querySelector('.file-name');

    if (input && fileNameSpan) {
        input.addEventListener('change', function () {
            fileNameSpan.textContent = input.files[0] ? input.files[0].name : '';
        });
    }
});

// Слайдер
class Slider {
    constructor(sliderElement) {
        this.sliderElement = sliderElement;
        this.pagination = sliderElement.nextElementSibling;
        this.currentIndex = 0;
        this.startX = 0;
        this.isDragging = false;
        this.autoSlideTimeout;

        this.init();
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler.bind(this));
    }

    init() {
        this.createPagination();
        this.updateSlider();
        this.updatePagination();

        this.sliderElement.addEventListener('mousedown', this.handleDragStart.bind(this));
        this.sliderElement.addEventListener('touchstart', this.handleDragStart.bind(this));
        document.addEventListener('mouseup', this.handleDragEnd.bind(this));
        document.addEventListener('touchend', this.handleDragEnd.bind(this));
        document.addEventListener('mousemove', this.handleDragMove.bind(this));
        document.addEventListener('touchmove', this.handleDragMove.bind(this));

        this.startAutoSlide();
    }

    resizeHandler() {
        const slideWidth = this.sliderElement.querySelector('.slide').clientWidth;
        this.sliderElement.style.width = slideWidth * this.sliderElement.children.length + 'px';
        this.sliderElement.parentElement.style.width = slideWidth + 'px';
    }

    createPagination() {
        const dots = this.sliderElement.children.length;
        for (let i = 0; i < dots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.pagination.appendChild(dot);
        }
    }

    updateSlider() {
        this.sliderElement.style.transform = `translateX(${-this.currentIndex * 340}px)`;
    }

    updatePagination() {
        const dots = this.pagination.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === this.currentIndex);
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.sliderElement.children.length && index !== this.currentIndex) {
            this.currentIndex = index;
            this.updateSlider();
            this.updatePagination();
        }
    }

    handleDragStart(e) {
        e.preventDefault();
        this.isDragging = true;
        this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    }

    handleDragEnd() {
        this.isDragging = false;
    }

    handleDragMove(e) {
        if (!this.isDragging) return;
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - this.startX;
        if (deltaX > 50 && this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
            this.startX = currentX;
        } else if (deltaX < -50 && this.currentIndex < this.sliderElement.children.length - 1) {
            this.goToSlide(this.currentIndex + 1);
            this.startX = currentX;
        }
    }

    startAutoSlide() {
        this.autoSlideTimeout = setTimeout(() => {
            const nextIndex = (this.currentIndex + 1) % this.sliderElement.children.length;
            this.goToSlide(nextIndex);
            this.startAutoSlide();
        }, 10000);
    }
}

document.querySelectorAll('.slider').forEach(sliderElement => new Slider(sliderElement));

// Эффект печатания текста
const textToPrint = "Ссылка на разработчика сайта";
const textElement = document.getElementById("textwritter");

function printText(text, index) {
    if (index < text.length) {
        textElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(() => printText(text, index), 100);
    } else {
        setTimeout(() => {
            textElement.innerHTML = "";
            printText(textToPrint, 0);
        }, 5000);
    }
}

setTimeout(() => printText(textToPrint, 0), 1000);

// Выпадающее меню
document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.question_conteiner');
    questions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            const plusElement = this.querySelector('.plus');
            if (plusElement) {
                plusElement.classList.toggle('rotated-element');
            }
        });
    });
});

// Анимация меток в форме
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    if (input.type !== 'date' && input.type !== 'time') {
        const label = input.nextElementSibling;
        input.addEventListener('input', () => {
            label.style.transition = 'none';
            label.style.top = '-10px';
            label.style.fontSize = '12px';
            label.style.color = 'goldenrod';
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.transition = '0.3s';
                label.style.top = '10px';
                label.style.fontSize = '14px';
                label.style.color = 'goldenrod';
            }
        });
    }
});

// Корзина и оформление заказа
document.addEventListener('DOMContentLoaded', function () {
    updateBasketCount();
    updateCountsFromLocalStorage();

    const delButtons = document.querySelectorAll('.del_count');
    const addButtons = document.querySelectorAll('.add_count');
    const iconBasket = document.querySelector('.header_basket_img');
    const plusButton = document.querySelector('.plus_close');

    // Добавление товара в корзину
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = button.closest('.service');
            const productId = productCard.id;
            const productName = productCard.querySelector('.service_title').textContent;
            const productImage = productCard.querySelector('.slide img').getAttribute('src');
            const productCount = parseInt(productCard.querySelector('.count').textContent);
            const productPrice = parseInt(productCard.querySelector('.service_price').textContent);
            const productPriceCent = parseInt(productCard.querySelector('.service_price_cent').textContent);

            const countSpan = this.parentNode.querySelector('.count');
            let count = parseInt(countSpan.textContent);
            count++;
            countSpan.textContent = count;

            const productData = {
                id: productId,
                name: productName,
                image: productImage,
                count: count,
                price: productPrice,
                price_cent: productPriceCent,
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.name === productName);

            if (existingProductIndex !== -1) {
                cart.splice(existingProductIndex, 1);
            }

            cart.push(productData);
            localStorage.setItem('cart', JSON.stringify(cart));

            updateBasketCount();
            viewHeader();
        });
    });

    // Удаление товара из корзины
    delButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = button.closest('.service');
            const productName = productCard.querySelector('.service_title').textContent;

            const countSpan = this.parentNode.querySelector('.count');
            let count = parseInt(countSpan.textContent);
            if (count > 0) {
                count--;
                countSpan.textContent = count;

                const productData = {
                    name: productName,
                    count: count
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProductIndex = cart.findIndex(item => item.name === productName);

                if (existingProductIndex !== -1) {
                    cart[existingProductIndex].count = count;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

                updateBasketCount();
                viewHeader();
            }

            if (count === 0) {
                removeFromLocalStorage(productName);
                checkAndClearLocalStorage();
                updateBasketCount();
            }
        });
    });

    // Открытие блока оформления заказа
    iconBasket.addEventListener('click', function () {
        const orderSection = document.querySelector('.order_section');
        if (orderSection) {
            orderSection.classList.remove('none');
            setTimeout(() => orderSection.classList.add('visible'), 100);
            document.body.style.overflow = 'hidden';
            createShoppingCart();
            updateOrderListInput();
        } else {
            window.location.href = '/';
        }
    });

    // Закрытие блока оформления заказа
    if (plusButton) {
        plusButton.addEventListener('click', function () {
            const orderSection = document.querySelector('.order_section');
            orderSection.classList.remove('visible');
            setTimeout(() => orderSection.classList.add('none'), 200);
            document.body.style.overflow = 'auto';
        });
    }

    // Добавление товара в корзине
    const addButtonsBaskets = document.querySelectorAll('.add_count_basket');
    addButtonsBaskets.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = button.closest('.food_data');
            const countElement = productCard.querySelector('.count');
            let count = parseInt(countElement.textContent);
            count++;
            countElement.textContent = count;
            const productName = productCard.querySelector('.food_name').textContent;

            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const productInCart = cartItems.find(item => item.name === productName);
            if (productInCart) {
                productInCart.count += 1;
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
        });
    });
});

// Удаление товара из локального хранилища
function removeFromLocalStorage(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

// Очистка локального хранилища, если корзина пуста
function checkAndClearLocalStorage() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        localStorage.clear();
        const orderFormData = document.querySelector('.order_form_data');
        if (!orderFormData.classList.contains('none')) {
            orderFormData.classList.add('none');
        }
        const foodList = document.querySelector('.food_list');
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Корзина пуста';
        foodList.appendChild(emptyCartMessage);
    }
}

// Обновление счетчика корзины
function updateBasketCount() {
    const basketCountElement = document.querySelector('.basket_count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.count || 0;
    });
    basketCountElement.textContent = totalCount;
    updateOrderListInput();
}

// Показ хедера
function viewHeader() {
    const header = document.querySelector('.header');
    header.classList.remove('hide');
}

// Обновление данных в форме заказа
function updateOrderListInput() {
    const orderListInput = document.getElementById('order_list');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (orderListInput) {
        orderListInput.value = '';
        if (cartItems.length > 0) {
            let orderListInfo = '';
            cartItems.forEach(item => {
                const itemNameUpper = item.name.toUpperCase();
                orderListInfo += `<b><i>${itemNameUpper}</i></b> (${item.count} шт.)-${item.price},${item.price_cent}р. \n`;
            });
            const totalPriceElement = document.querySelector('.total_price_cost');
            const totalPrice = totalPriceElement.textContent.trim();
            orderListInfo += ` \n <b><i> ИТОГО: ${totalPrice} </i></b> \n`;
            orderListInput.value = orderListInfo;
        }
    }
}

// Формирование корзины в блоке оформления заказа
function createShoppingCart() {
    const foodList = document.querySelector('.food_list');
    const orderFormData = document.querySelector('.order_form_data');
    foodList.innerHTML = '';
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Корзина пуста';
        foodList.appendChild(emptyCartMessage);
        orderFormData.classList.add('none');
    } else {
        cartItems.forEach(item => {
            const foodData = document.createElement('div');
            foodData.classList.add('food_data');

            const foodImg = document.createElement('img');
            foodImg.src = item.image;
            foodImg.alt = '';
            foodImg.classList.add('food_img');

            const foodInfo = document.createElement('div');
            const foodName = document.createElement('span');
            foodName.classList.add('food_name');
            foodName.textContent = item.name;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button_container');

            const delCount = document.createElement('span');
            delCount.classList.add('del_count_basket');

            const count = document.createElement('span');
            count.classList.add('count');
            count.textContent = item.count;

            const addCount = document.createElement('span');
            addCount.classList.add('add_count_basket');

            const foodPrice = document.createElement('p');
            const priceValue = document.createElement('span');
            priceValue.classList.add('food_price');
            priceValue.textContent = item.price;
            foodPrice.appendChild(priceValue);
            foodPrice.insertAdjacentText('beforeend', ' р. ');

            const priceCent = document.createElement('span');
            priceCent.classList.add('service_price_cent');
            priceCent.textContent = item.price_cent >= 0 && item.price_cent <= 9 ? "0" + item.price_cent : item.price_cent;
            foodPrice.appendChild(priceCent);
            foodPrice.insertAdjacentText('beforeend', ' к.');

            buttonContainer.appendChild(delCount);
            buttonContainer.appendChild(count);
            buttonContainer.appendChild(addCount);

            foodInfo.appendChild(foodName);
            foodInfo.appendChild(buttonContainer);
            foodInfo.appendChild(foodPrice);

            foodData.appendChild(foodImg);
            foodData.appendChild(foodInfo);
            foodList.appendChild(foodData);
        });

        orderFormData.classList.remove('none');
        calculateTotalCost();
        calculateDiscount();
    }
}

// Обработка кнопок +/- в корзине
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add_count_basket')) {
        const productCard = event.target.closest('.food_data');
        const countElement = productCard.querySelector('.count');
        let count = parseInt(countElement.textContent);
        count++;
        countElement.textContent = count;
        const productName = productCard.querySelector('.food_name').textContent;

        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cartItems.find(item => item.name === productName);
        if (productInCart) {
            productInCart.count += 1;
            const productId = productInCart.id;
            const productInDocument = document.getElementById(productId);
            if (productInDocument) {
                const countElementInDocument = productInDocument.querySelector('.count');
                if (countElementInDocument) {
                    countElementInDocument.textContent = productInCart.count;
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        calculateTotalCost();
        calculateDiscount();
        updateBasketCount();
    }

    if (event.target.classList.contains('del_count_basket')) {
        const productCard = event.target.closest('.food_data');
        const productName = productCard.querySelector('.food_name').textContent;
        const countElement = productCard.querySelector('.count');
        let count = parseInt(countElement.textContent);

        if (count > 0) {
            count--;
            countElement.textContent = count;
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const productInCart = cartItems.find(item => item.name === productName);
            if (productInCart) {
                productInCart.count -= 1;
                const productId = productInCart.id;
                const productInDocument = document.getElementById(productId);
                if (productInDocument) {
                    const countElementInDocument = productInDocument.querySelector('.count');
                    if (countElementInDocument) {
                        countElementInDocument.textContent = productInCart.count;
                    }
                }
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
            calculateTotalCost();
            calculateDiscount();
            updateBasketCount();
        }

        if (count === 0) {
            removeFromLocalStorage(productName);
            productCard.remove();
            checkAndClearLocalStorage();
        }
        updateOrderListInput();
    }
});

// Подсчет общей стоимости
function calculateTotalCost() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCost = 0;
    cartItems.forEach(item => {
        totalCost += item.price * item.count + item.price_cent * item.count / 100;
    });
    const totalPriceElement = document.querySelector('.total_price_cost');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalCost.toFixed(2);
    }
}

// Подсчет предоплаты
function calculateDiscount() {
    const prepaymentElement = document.querySelector('.prepayment_amount');
    const prepaymentAmount = parseFloat(prepaymentElement.textContent.trim());
    const totalPriceElement = document.querySelector('.total_price_cost');
    const totalPrice = Math.round(parseFloat(totalPriceElement.textContent.trim()));
    const prepaymentValue = Math.round(totalPrice * (prepaymentAmount / 100));
    const prepaymentInput = document.querySelector('.prepayment');
    prepaymentInput.value = prepaymentValue + ' р.';
}

// Обновление счетчиков товаров на странице
function updateCountsFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.forEach(item => {
        const { id, count } = item;
        const element = document.getElementById(id);
        if (element) {
            const countElement = element.querySelector('.count');
            if (countElement) {
                countElement.textContent = count;
            }
        }
    });
}

// Валидация формы
const formButton = document.querySelector('.form_button');
formButton.addEventListener('click', function (event) {
    event.preventDefault();
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const userNameInput = document.getElementById('userName').value;
    const phoneNumberInput = document.getElementById('phoneNumber').value;

    if (!dateInput || !timeInput || !userNameInput || !phoneNumberInput) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    if (userNameInput.length < 3 || phoneNumberInput.length < 5) {
        alert('Пожалуйста, заполните правильно имя и номер телефона.');
        return;
    }

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    if (dateInput < currentDateString) {
        alert('Вы выбрали прошедшую дату. Пожалуйста, выберите правильную дату.');
        return;
    }

    const cleanedPhoneNumber = phoneNumberInput.replace(/[^\d\s+-]/g, '');
    if (phoneNumberInput !== cleanedPhoneNumber) {
        alert('Пожалуйста, заполните правильно номер телефона.');
        return;
    }

    const form = document.querySelector('.form_order');
    form.submit();
});

// Галерея фотографий
const gallery = document.querySelector('#gallery');
const getVal = (elem, style) => parseInt(window.getComputedStyle(elem).getPropertyValue(style));
const getHeight = item => item.querySelector('.content').getBoundingClientRect().height;

const resizeAll = () => {
    const altura = getVal(gallery, 'grid-auto-rows');
    const gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(item => {
        item.style.gridRowEnd = `span ${Math.ceil((getHeight(item) + gap) / (altura + gap))}`;
    });
};

window.addEventListener('resize', resizeAll);

if (gallery) {
    gallery.querySelectorAll('img').forEach(item => {
        item.style.opacity = '0';
        if (item.complete) {
            showImage(item);
        } else {
            item.addEventListener('load', () => setTimeout(() => showImage(item), 100));
        }
    });
}

function showImage(item) {
    const altura = getVal(gallery, 'grid-auto-rows');
    const gap = getVal(gallery, 'grid-row-gap');
    const gitem = item.parentElement.parentElement;
    gitem.style.gridRowEnd = `span ${Math.ceil((getHeight(gitem) + gap) / (altura + gap))}`;
    item.style.opacity = '1';
    gitem.addEventListener('click', () => gitem.classList.toggle('full'));
}