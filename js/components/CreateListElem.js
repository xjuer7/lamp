import { btnBasketClick } from "./Basket.js";
import { createBtnPagination } from "./Pagination.js";
import { showTooltip } from "./Tooltip.js";

const ulItemsEl = document.querySelector('.catalog__list');
const paginationBlock = document.querySelector('.catalog__pagination');


export async function updateData(arr, pageNum = 1) {
    ulItemsEl.innerHTML = '';
    paginationBlock.innerHTML = ''

    const itemsPerPage = 6;
    const totalPages = Math.ceil(arr.length / itemsPerPage)

    const startIndex = (pageNum - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageElements = arr.slice(startIndex, endIndex)
    currentPageElements.forEach(item => {
        ulItemsEl.append(createCardEl(item))
    })

    for (let i = 1; i <= totalPages; i++) {
        paginationBlock.append(createBtnPagination(i, pageNum, arr));
    }
    showTooltip()
}

export function createCardEl(obj) {
    const li = document.createElement('li')
    li.classList.add('catalog__item')
    const cardEl = document.createElement("div");
    cardEl.classList.add("product-card")
    const cardVisual = document.createElement('div')
    cardVisual.classList.add("product-card__visual")

    const cardVisualImg = document.createElement('img')
    cardVisualImg.classList.add("product-card__img")
    cardVisualImg.setAttribute('src', `${obj.image}`)
    cardVisualImg.setAttribute('height', '436')
    cardVisualImg.setAttribute('width', '290')
    cardVisualImg.setAttribute('alt', 'Изображение товара')

    const cardVisualLinksWrap = document.createElement('div')
    cardVisualLinksWrap.classList.add("product-card__more")

    const btnAddBasket = document.createElement('a')
    btnAddBasket.classList.add('product-card__link')
    btnAddBasket.classList.add('btn')
    btnAddBasket.classList.add('btn--icon')
    btnAddBasket.innerHTML = `
        <span class="btn__text">В корзину</span>
        <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="images/sprite.svg#icon-basket"></use>
        </svg>`

    btnAddBasket.addEventListener('click', () => btnBasketClick(obj))

    const btnInfo = document.createElement('a');
    btnInfo.classList.add('product-card__link')
    btnInfo.classList.add('btn')
    btnInfo.classList.add('btn--secondary')
    btnInfo.innerHTML = `<span class="btn__text">Подробнее</span>`

    cardVisualLinksWrap.append(btnAddBasket, btnInfo)
    cardVisual.append(cardVisualImg, cardVisualLinksWrap)

    const cardInfo = document.createElement('div')
    cardInfo.classList.add("product-card__info")
    const cardTitle = document.createElement('h2')
    cardTitle.classList.add("product-card__title")
    cardTitle.textContent = `${obj.name}`

    const cardOldPrice = document.createElement('span')
    cardOldPrice.classList.add("product-card__old")
    cardOldPrice.innerHTML = `
    <span class="product-card__old-number">${obj.price.old}</span>
    <span class="product-card__old-add">₽</span>`

    const cardNewPrice = document.createElement('span')
    cardNewPrice.classList.add("product-card__price")
    cardNewPrice.innerHTML = `
    <span class="product-card__price-number">${obj.price.new}</span>
    <span class="product-card__price-add">₽</span>`

    cardInfo.append(cardTitle, cardOldPrice, cardNewPrice)

    const cardTooltip = document.createElement('div')
    cardTooltip.classList.add("product-card__tooltip")
    cardTooltip.classList.add("tooltip")
    cardTooltip.setAttribute('data-template', `${obj.id}`)
    
    const cardTooltipBtn = document.createElement('button');
    cardTooltipBtn.classList.add('tooltip__btn')
    cardTooltipBtn.innerHTML = `
     <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
        <use xlink:href="images/sprite.svg#icon-i"></use>
        </svg>`

    const cardTooltipContent = document.createElement('div');
    cardTooltipContent.classList.add('tooltip__content')
    cardTooltipContent.setAttribute('id', `${obj.id}`)
    cardTooltipContent.innerHTML = `<span class="tooltip__text">Наличие товара по городам:</span>
        <ul class="tooltip__list">
        <li class="tooltip__item">
            <span class="tooltip__text">Москва: <span class="tooltip__count">${obj.availability.moscow}</span></span>
        </li>
        <li class="tooltip__item">
            <span class="tooltip__text">Оренбург: <span class="tooltip__count">${obj.availability.orenburg}</span></span>
        </li>
        <li class="tooltip__item">
            <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${obj.availability.saintPetersburg}</span></span>
        </li>
        </ul>`

    cardTooltip.append(cardTooltipBtn, cardTooltipContent)
    cardInfo.append(cardTooltip)
    cardEl.append(cardVisual, cardInfo)
    li.append(cardEl)
  
    return li
}


