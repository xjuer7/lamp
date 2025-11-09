
export function showTooltip() {

    tippy(`.tooltip`, {
        content(reference) {
            const id = reference.getAttribute('data-template');
            const template = document.getElementById(id);
            return template.innerHTML;
        },
        allowHTML: true,
        arrow:false,
    })


}