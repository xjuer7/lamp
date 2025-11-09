export function accordionOperation() {
    const accordionBtnAll = document.querySelectorAll('.accordion__btn'); 

    accordionBtnAll.forEach(btn => {
        btn.addEventListener('click', (e) => {
            checkClass(e, accordionBtnAll)
            btn.classList.toggle('accordion__btn--active')
        })
    });
}

function checkClass(e, arr) {
    for (let i = 0; i < arr.length; i++) {
        const btn = arr[i];

        if (btn.classList.contains('accordion__btn--active')) {
            btn.classList.remove('accordion__btn--active')

            const elemAdded = e.composedPath().includes(btn)
            if(elemAdded) {
                btn.classList.toggle('accordion__btn--active')
            }
        } 
    } 
}

