/*------------
Global Variables
-------------*/


let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone,dob &noinfo &nat=GB'
const container = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const closeModal = document.querySelector('.modal-close');

const modalContainer = document.querySelector('.modal');

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// let employeeCount = employees.indexOf(employees[index])
// let position = employeeCount;

//----------------------------------------------

/*--------------
Fetch info from API
--------------*/
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)  // console.log(res.results.map(employee => employee.location.street));
    .then(displayEmployees)
    .then(createSearchData)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';
    console.log(employeeData);

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
    console.log(modalHTML);

    /*------------
    Move between modal windows
    -------------*/
    // employeeData  or is it employees is returned as an array of objects
    // modalHTML holds the content in the modal
    // on click of the arrow move to the next object in an array

    //let employeeCount = employees[index];

    let employeeCount = employees.indexOf(employees[index])
    let position = employeeCount;


    console.log(employeeCount);

    function employeeScroll(callback) { // callback function, called in next and prev items function. Stops repeating code
        let date = new Date(employees[position].dob.date); //Important to create new date
        modal.innerHTML = `
            <img class="avatar" src="${employees[position].picture.large}" alt="Picture of employee ${employees[position].name.first} ${employees[position].name.last}"/>
            <div class="text-container">
                <h2 class="name">${employees[position].name.first} ${employees[position].name.last}</h2>
                <p class="email">${employees[position].email}</p>
                <p class="address">${employees[position].location.city}</p>
                <hr/>
                <p>${employees[position].phone}</p>
                <p class="address">${employees[position].location.street.number}, ${employees[position].location.street.name}, ${employees[position].location.state} ${employees[position].location.postcode}</p>
                <p>Birthday:
                ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>

            </div>

        `
}

    function prevItem() {
        position -= 1;
        employeeScroll(); // call the function employeeScroll to show the modal content
        if(position === 0) { // when index reaches 0 hide left arrow
            leftArrow.style.display = "none";
        } else {
            rightArrow.style.display = "block"; // else show right arrow when you click prev arrow
        }
    }

    function nextItem() {
        position += 1;
        employeeScroll(); // call the function employeeScroll to show the modal content
        if(position === 11) { // when index reaches 11 hide right arrow
            rightArrow.style.display = "none";
        } else {
            leftArrow.style.display = "block"; // else show left arrow when you click next arrow
        }
    }

    leftArrow.addEventListener('click', e => {
        prevItem();
        console.log(position);
    })

    rightArrow.addEventListener('click', e => {
        nextItem();
        console.log(position);
    })

    console.log(position);


}

/*------------
Search function
-------------*/

const searchData = []; // push first and last name into this searchData array
function createSearchData() {
    employees.forEach((employee) => {
        searchData.push(`${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}`)
    })
    console.log(searchData);
}

const search = document.querySelector("#searchBox");
search.addEventListener('keyup', () => {
    const card = document.querySelectorAll('.card');
    let searchVal = search.value.toLowerCase();
    searchData.forEach((person, index) => { //for  each person in the search data array
        if (person.includes(searchVal)) {
            card[index].style.display = 'flex';
        } else {
            card[index].style.display = 'none';
        }
    })
});


/*------------
Event Listeners
-------------*/

// Display modal when click a card
container.addEventListener('click', e => {

    if (e.target !== container) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
        position = parseInt(card.getAttribute('data-index'));
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

