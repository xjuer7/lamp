import { createCardEl } from './CreateListElem.js'
import { showTooltip } from "./Tooltip.js";

const ulGoods = document.querySelector('.day-products__list');
const btnNavigateNext = document.querySelector('.day-products__navigation-btn--next'); 
const btnNavigatePrev = document.querySelector('.day-products__navigation-btn--prev'); 

const swiper = new Swiper('.swiper', {
    speed:400,
    spaceBetween: 40,
    slidesPerView: 4,
    navigation: {
        nextEl: btnNavigateNext,
        prevEl: btnNavigatePrev,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
});

export async function sliderOperation(arr) {
    const goodsOfDayArr = arr.filter(el => el.goodsOfDay == true)

    goodsOfDayArr.map(item => {
        ulGoods.append(createCardGoodsEl(item))
    })
    changeCardGoodsEl()

   swiper;
   showTooltip()
}

function createCardGoodsEl(obj) {
    const liGoods = createCardEl(obj);
    liGoods.classList.add('day-products__item')
    liGoods.classList.add('swiper-slide')
    liGoods.classList.remove('catalog__item')
    return liGoods
}

function changeCardGoodsEl() {
    const liGoodsItems = document.querySelectorAll('.day-products__item');
    liGoodsItems.forEach(goods => {
        const divWrapGoods = goods.querySelector('.product-card')
        divWrapGoods.classList.add('product-card--small')
        const imgGoods = goods.querySelector('.product-card__img')
        imgGoods.setAttribute('height', '344')
        imgGoods.setAttribute('width', '290')
    })
}

