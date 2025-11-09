import { updateData } from "./CreateListElem.js";

export function createBtnPagination(pageNum, activePage, arr) {
    const li = document.createElement('li');
    li.classList.add('catalog__pagination-item')

    const btn = document.createElement('button');
    btn.classList.add('catalog__pagination-link')

    btn.textContent = pageNum

    if (pageNum === activePage) {
        btn.classList.add('catalog__pagination-link--active');
    }
    btn.addEventListener('click', () => updateData(arr, pageNum))

    li.append(btn)
    return li
}