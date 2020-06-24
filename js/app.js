let today = new Date();
let year = today.getFullYear();
let currentYear = document.querySelector('#date');
currentYear.innerHTML = year;


// Test to check modal works - to be removed
const showModal = document.querySelector('#show');

showModal.addEventListener('click', e => {
    let modal = document.querySelector('.overlay');
    modal.classList.remove('hidden');
});