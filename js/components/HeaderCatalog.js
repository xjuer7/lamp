const catalogBlock = document.querySelector('.main-menu');
const headerCatalogBtn = document.querySelector(".header__catalog-btn");
const menuCloseBtn = document.querySelector('.main-menu__close');
const menuWrapperEl = document.querySelector('.main-menu__wrapper');


export function headerBurgerClicked() {
    headerCatalogBtn.addEventListener('click', () => {
        catalogBlock.classList.add('main-menu--active');
        const abortController = new AbortController()

        setTimeout(() => {
            document.addEventListener('click', (e) => {
                const withinCurrentBlock = e.composedPath().includes(menuWrapperEl);
                if (!withinCurrentBlock) {
                    catalogBlock.classList.remove('main-menu--active')
                    abortController.abort()
                }
            }, {signal: abortController.signal})
        }, 1000);

        menuCloseBtn.addEventListener('click', () => {
            catalogBlock.classList.remove('main-menu--active')
            abortController.abort()
        })
    })
}