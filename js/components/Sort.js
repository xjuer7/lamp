import { updateData } from "./CreateListElem.js";
import { getActiveType, filterProducts } from "./Filter.js";


export async function sortItems(arr) {
    const sortSelectEl = document.querySelector('.catalog__sort-select');
    const popularValue = document.querySelector('.catalog__sort-select option[value="rating-max"]')
    popularValue.selected = true

    await updateData(await byFieldSort(arr, popularValue.value))

    sortSelectEl.onfocus = function() {
        sortSelectEl.addEventListener('change', async () => {
            const selectValue = sortSelectEl.value
            const sortedArr = await byFieldSort(arr, selectValue)

            const checkingFilter = getActiveType()
            if(checkingFilter) {
                const filteredActiveArr = await filterProducts(checkingFilter, sortedArr)
                console.log(filteredActiveArr);
            } else {
                await updateData(sortedArr)
            }
        })
    } 
}

async function byFieldSort(arr, selectValue) {
    let newArr = [];
    if (selectValue === 'price-max') {
        newArr = arr.sort((a,b) => +a.price.new > +b.price.new ? -1 : 1)
    } else if (selectValue === 'price-min') {
        newArr = arr.sort((a,b) => +a.price.new > +b.price.new ? 1 : -1)
    } else if (selectValue === 'rating-max') {
        newArr = arr.sort((a,b) => +a.rating > +b.rating ? -1 : 1)
    }
    return newArr
}
