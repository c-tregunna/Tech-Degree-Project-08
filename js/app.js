/*------------
Global Variables
-------------*/


let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone,dob &noinfo &nat=GB'
const container = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const closeModal = document.querySelector('.modal-close');

//----------------------------------------------

/*--------------
Fetch info from API
--------------*/
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)  // console.log(res.results.map(employee => employee.location.street));
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" alt="Picture of employee ${name.first} ${name.last}"/>
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });
    container.innerHTML = employeeHTML;
}

/*------------
Modal function
-------------*/

function displayModal(index) {
    let {
        name,
        dob,
        phone,
        email,
        location: {
            city,
            street,
            state,
            postcode
        },
        picture
    } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}" alt="Picture of employee ${name.first} ${name.last}"/>
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr/>
        <p>${phone}</p>
        <p class="address">${street.number}, ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
            ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove('hidden');
    modal.innerHTML = modalHTML;
}

/*------------
Search function
-------------*/

const search = document.getElementById("searchBar");

search.addEventListener('keyup', () => {
    let searchEmployee = search.value.toLowerCase();
    const names = document.querySelectorAll('h2.name');

    names.forEach(name => {
        let employeeName = name.textContent.toLowerCase();
        let employeeCard = document.querySelectorAll('.card');

        if (employeeName.indexOf(searchEmployee) > -1) {
            employeeCard.style.display = '';
        } else {
            employeeCard.style.display = 'none';
        }
    });

});

//OR this other function, adapted from unit 05

    // let employeeCard = document.querySelectorAll('.card');
    // let searchEmployee = document.getElementById('searchBox');
    // searchEmployee.addEventListener('keyup', function(){
    //     let search =searchEmployee.value.toLowerCase();
    //     for(let i = 0; i < employeeCard.length; i++) {
    //         let searchVal = employeeCard[i].document.querySelectorAll('.name');
    //         if(searchVal.toLowerCase().indexOf(search) > -1){
    //             employeeCard[i].style.display = "";
    //         }else{
    //             employeeCard[i].style.display = "none";
    //         }
    //     }
    // });


/*------------
Event Listeners
-------------*/

// Display modal when click a card
container.addEventListener('click', e => {

    if (e.target !== container) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

//Close modal
closeModal.addEventListener('click', e => {
    let modal = document.querySelector('.overlay');
    modal.classList.add('hidden');
});


/*------------
Adds year to footer
-------------*/

let today = new Date();
let year = today.getFullYear();
let currentYear = document.querySelector('#date');
currentYear.innerHTML = year;




// Test to check modal works - to be removed
/*
const showModal = document.querySelector('#show');
const closeModal = document.querySelector('.modal-close');

showModal.addEventListener('click', e => {
    let modal = document.querySelector('.overlay');
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', e => {
    let modal = document.querySelector('.overlay');
    modal.classList.add('hidden');
});
*/

