/*------------
Global Variables
-------------*/


let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone,dob &noinfo &nat=GB'
const container = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const closeModal = document.querySelector('.modal-close');

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const position =[];




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




let employeeCount = employees.indexOf(employees[index]);

console.log(employeeCount);


function prevItem() {
    position -= 1;
    modal.innerHTML = `
        <img class="avatar" src="${employees[position].picture.large}" alt="Picture of employee ${employees[position].name.first} ${employees[position].name.last}"/>
    `
}

function nextItem() {
    employeeCount = index + 1;
}

    leftArrow.addEventListener('click', e => {
        modal.innerHTML =  prevItem();
    })

    rightArrow.addEventListener('click', e => {
        modal.innerHTML = nextItem();
    })


}


// employeeData  or is it employees is returned as an array of objects
// modalHTML holds the content in the modal
// on click of the arrow move to the next object in an array




/*
let i = 0;
employees[i];

function nextItem() {
    i = i + 1;
    //i = i % employees.length;
    return employees[i];
}

function prevItem() {
    if (i === 0) {
        i = employees.length;
    }
    i = i - 1;
    return employees[i];
}

leftArrow.addEventListener('click', e => {
    modal.innerHTML = prevItem();
})

rightArrow.addEventListener('click', e => {
    modal.innerHTML = nextItem();
})
*/


// for (let i = 0; i < employees.length; i += 1) {
//     return employees[i];
// }



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

/*
let search = document.getElementById("searchBar");

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
*/

//OR this other function, adapted from unit 05

/*
    let employeeCard = document.querySelectorAll('.card');
    let searchEmployee = document.getElementById('searchBox');
    let employeeName = document.querySelectorAll('.name');
    searchEmployee.addEventListener('keyup', function(){
        let search = searchEmployee.value.toLowerCase();
        for(let i = 0; i < employeeCard.length; i++) {
            let searchVal = employeeCard[i].document.querySelectorAll('.name');
            if(searchVal.toLowerCase().indexOf(search) > -1){
                employeeCard[i].style.display = "";
            }else{
                employeeCard[i].style.display = "none";
            }
        }
    });
*/

// Third attempt :(

/*
let employeeCard = document.querySelectorAll('.card');
let searchEmployee = document.getElementById('searchBox');
let employeeName = document.querySelectorAll('.name');

searchEmployee.addEventListener('keyup', function(){
    employeeName.forEach(name => {
        let employeeName = name.textContent.toLowerCase();

        if (employeeName.indexOf(searchEmployee) > -1) {
            employeeCard.style.display = '';
        } else {
            employeeCard.style.display = 'none';
        }
    });
});
*/


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

    position = card.getAttribute('data-index');
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

