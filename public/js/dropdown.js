const dropdowns = document.querySelectorAll('.dropdown-filter');


const closeAllDropdowns = () => {
    dropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('opened')) {
            dropdown.classList.remove('opened');
        }
    });
}

dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-filter__toggle');
    button.addEventListener('click', () => {
        const isDropdownOpened = dropdown.classList.contains('opened');
        closeAllDropdowns();
        if (!isDropdownOpened) {
            dropdown.classList.add('opened');
        }
    });
})