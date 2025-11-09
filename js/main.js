import { headerBurgerClicked } from './components/HeaderCatalog.js'
import { locationCityClicked } from './components/LocationCity.js'
import { getProducts } from './components/Fetch.js';
import { filterCheckbox } from './components/Filter.js';
import { sortItems } from './components/Sort.js';
import { renderBasket } from './components/Basket.js';
import { accordionOperation } from './components/Accordion.js';
import { sliderOperation } from './components/slider.js';
import { validateForm } from './components/Form.js'

window.addEventListener('DOMContentLoaded', async () => {
    const list = await getProducts();
    
    headerBurgerClicked()
    locationCityClicked()
    await filterCheckbox(list)
    await sortItems(list)
    renderBasket()
    accordionOperation()
    sliderOperation(list)
    validateForm()
});
