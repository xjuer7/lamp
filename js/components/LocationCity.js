export function locationCityClicked() {
    const locationCityEl = document.querySelector('.location__city');
    const locationNameCityEl = document.querySelector('.location__city-name');
    const valueCity = document.querySelectorAll('.location__sublink');

    locationCityEl.addEventListener('click', () => locationCityEl.classList.toggle('location__city--active') )

    valueCity.forEach(el => {
        el.addEventListener('click', () => {
            locationNameCityEl.textContent = el.textContent
            locationCityEl.classList.toggle('location__city--active')
        })
    })
}