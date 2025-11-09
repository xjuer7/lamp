let count = 0;
const ulBasket = document.querySelector(".basket__list");
const basketEmptyText = document.querySelector(".basket__empty-block");
const basketLinkOrder = document.querySelector(".basket__link");
const basketCounter = document.querySelector(".header__user-count");
const basketBtnEl = document.querySelector(".header__user-btn");
const basketDiv = document.querySelector(".basket");

export function renderBasket() {
    basketLinkOrder.style.display = "none";
    basketCounter.textContent = count

    basketBtnEl.addEventListener("click", () => {
        basketDiv.classList.toggle("basket--active");
    });
}

export function btnBasketClick(obj) {
    if (ulBasket.innerHTML !== "") {
        basketEmptyText.style.display = "none";
        basketLinkOrder.style.display = "flex";
    } 

    ulBasket.append(createBasketCardEl(obj));
    basketCounter.textContent = ++count

}

function createBasketCardEl(obj) {
    const li = document.createElement("li");
    li.classList.add("basket__item");
    const divImg = document.createElement("div");
    divImg.classList.add("basket__img");
    divImg.innerHTML = `
            <img src=${obj.image} alt="Фотография товара" height="60" width="60">`;

    const spanName = document.createElement("span");
    spanName.classList.add("basket__name");
    spanName.textContent = obj.name;
    const spanPrice = document.createElement("span");
    spanPrice.classList.add("basket__price");
    spanPrice.textContent = `${obj.price.new} руб`;

    const btnClose = document.createElement("btn");
    btnClose.classList.add("basket__item-close");
    btnClose.innerHTML = `
            <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
            </svg>`;

    btnClose.addEventListener('click', () => {
        li.remove()
        basketCounter.textContent = --count

        if (count == 0) {
            basketEmptyText.style.display = "block";
            basketLinkOrder.style.display = "none";
        }
    })

    li.append(divImg, spanName, spanPrice, btnClose);
    return li;
}


