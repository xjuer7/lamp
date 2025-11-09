import { updateData } from "./CreateListElem.js";
import { sortItems } from "./Sort.js";

const checkboxFilters = document.querySelectorAll('.catalog-form__item-col input');
const checkboxResetBtn = document.querySelector('.catalog-form__reset');
const form = document.querySelector('.catalog-form');
const radioAll = document.getElementById('all-item');
const radioInstock = document.getElementById('instock');

export async function filterCheckbox(arr) {
    const copylist = [...arr]
   
    //обновляем счетчики для каждого фильтра
    checkboxFilters.forEach(elem => {
        const filterValue = elem.value
        const matchingItems = copylist.filter(item => item.type.includes(filterValue))
        const counterElem = document.querySelector(`.custom-checkbox--${filterValue} .custom-checkbox__count`)
        //устанавливаем новое значение счетчика
       counterElem.textContent = matchingItems.length
    })   
    //отрисовка элементов выбранных категорий
    renderFilter(arr) 
    resetFilters(arr)
    availabilityRadioFilter(arr)
}

async function renderFilter(arr) {
    checkboxFilters.forEach(elem => {
        elem.addEventListener('change', async () => {
            const activeCategories = getActiveType()
            filterProducts(activeCategories, arr)
            const radioAll = document.getElementById('all-item')
            radioAll.checked = true
        })
    })
}
//записываем в массив выбранные категории товаров
export function getActiveType() {
    const checkboxes = document.querySelectorAll('.catalog-form__list-col input[type="checkbox"]:checked');
    const activeType = [];
    checkboxes.forEach(checkbox => activeType.push(checkbox.value))

    return activeType
}
//проверка на уникальность элемента
function removeDuplicates(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }
    return result;
}

export async function filterProducts(activeType, arr) {
    //если категории не выбраны, выводим исходный массив элементов
    if (activeType.length === 0) {
        await updateData(arr)
        return
    }
    //проверка наличия одной из выбранных категории у товара 
    const filteredItemsArr = arr.filter(item => {
        for (let i = 0; i < activeType.length; i++) {
            // console.log(item.type.indexOf(activeType[i]), item.type);
            if (item.type.indexOf(activeType[i]) !== -1) {
                return true;
            }
        }
        return false;
    });
    //удаляем дубликаты 
    const uniqueFilteredItems = removeDuplicates(filteredItemsArr)
    await updateData(uniqueFilteredItems)
}

function resetFilters(arr) {
    checkboxResetBtn.addEventListener('click', async () => {
        form.reset()
        await sortItems(arr)
    })
}
//изменение радиокнопок блока Статус
function availabilityRadioFilter(arr) {
    radioAll.addEventListener('change', async () => {
        await updateData(arr)
    })

    radioInstock.addEventListener('change', async () => {
        checkboxFilters.forEach(elem => elem.checked = false)

        const chosenCity = document.querySelector('.location__city-name').textContent;
        const res = arr.filter(item => {
            if(chosenCity == 'Москва') {
                return item.availability.moscow !== 0
            } else if (chosenCity == 'Оренбург') {
                return item.availability.orenburg !== 0
            } else if (chosenCity == 'Санкт-Петербург') {
                return item.availability.saintPetersburg !== 0
            }
        })
        await updateData(res)
    })

}




