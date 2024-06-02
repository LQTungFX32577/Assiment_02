'use strict';
//khai bao cac doi tuong 
// gan doi tuong cho cac dom element
const nav = document.querySelector('#sidebar');
const submitBtn = document.getElementById("submit-btn");
const done = document.getElementById("submited-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEdit = document.getElementById("tbody");
const bmi = document.getElementById("calc-btn");
const formstyle = document.getElementById('container-form');
let editing = document.getElementById('editing').value;


let value = idInput.value;
let type1 = typeInput.options[typeInput.selectedIndex].text;  
//hieu ung nav
nav.addEventListener('mouseover', function(){

    nav.classList.remove('active');
   });
   nav.addEventListener('mouseout', function(){
       
       nav.classList.add('active');
      });
  
let breedArr = JSON.parse(getFromStorage("BreedArr")) ?? "[]";
let petArr = JSON.parse(getFromStorage("petArr")) ?? "[]";
// Bổ sung Animation cho Sidebar 
//bat su kien click vao sidebar


//kiem tra key petArr ? neu co thi tien hanh them du lieu vao : neu khong thi tao mot mang moi.
// let petArr = JSON.parse(getFromStorage("petArr")) ?? "[]";

// tao mang petarr va luu gia tri 
//  const petArr = JSON.parse(getFromStorage("petArr")) ??'[]';

//render data 
function renderTableData(petArr) {
    tableBodyEdit.innerHTML = '';
    petArr = JSON.parse(getFromStorage("petArr")) ?? "[]";
    //luu du lieu vao petArr 
    petArr.forEach((editpet) => {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope="row">P${editpet.id}</th>
    <td>${editpet.name}</td>
    <td>${editpet.age}</td>
    <td>${editpet.type}</td>
    <td>${editpet.weight} kg</td>
    <td>${editpet.length} cm</td>
    <td>${(editpet.breed)}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${editpet.color}"></i>
    </td>
    <td><i class="bi ${editpet.vaccinated ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td><i class="bi ${editpet.sterilized ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td><i class="bi ${editpet.dewormed ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td>${displayDate(editpet.date).slice(8,10)}/
    ${displayDate(editpet.date).slice(5,7)}/
    ${displayDate(editpet.date).slice(0,4)}
    </td> 
    <td><button class="btn btn-warning" onclick="edit(${editpet.id})">Edit</button>
    </td>`;
    tableBodyEdit.appendChild(row);
    });
 };
typeInput.addEventListener('click', renderBreed);
function renderBreed() {
    breedInput.innerHTML = "<option>Select breed</option>";
    
    if(typeInput.value ==="Dog") {
        const DogBreeds = breedArr.filter((breedchoose) => breedchoose.type === 'Dog');
        DogBreeds.forEach(function(breedchoose) {
        const option = document.createElement("option");
        option.innerHTML = `${breedchoose.breed}`;
        breedInput.appendChild(option);
        });
    }else if(typeInput.value === "Cat") {
        const CatBreeds = breedArr.filter((breedchoose) => breedchoose.type === 'Cat');
        CatBreeds.forEach(function(breedchoose) {
        const option = document.createElement("option");
        option.innerHTML = `${breedchoose.breed}`;
        breedInput.appendChild(option);
        })
    }
}
//XOA DU LIEU TU FORM
function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select type";
    weightInput.value = "";
    lengthInput.value = "";
    breedInput.value = "Select type";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};

function edit(petIndex) {

    formstyle.classList.remove('hide');
    editing = petIndex ;
    
    for(let i =0; i<petArr.length; i++) {
        if(petIndex == petArr[i].id){
    idInput.value = petArr[i].id;
    nameInput.value = petArr[i].name;
    ageInput.value = petArr[i].age;
    typeInput.value = petArr[i].type;
    weightInput.value = petArr[i].weight;
    lengthInput.value = petArr[i].length;
    vaccinatedInput.checked = petArr[i].vaccinated;
    dewormedInput.checked = petArr[i].dewormed;
    sterilizedInput.checked = petArr[i].vaccinated;
    }
    renderBreed();
    breedInput.value = `${petArr[i].breed}`;
    };
}

done.addEventListener('click', function(){
    formstyle.classList.add('hide');
});
submitBtn.addEventListener('click', edited);
function edited() {
    let editdata = editing;
    petArr[editdata - 1] =
    {
        id: idInput.value, 
        name: nameInput.value, 
        age: ageInput.value ,
        type: typeInput.value ,
        weight: weightInput.value ,
        length: lengthInput.value ,
        vaccinated: vaccinatedInput.checked,
        sterilized: sterilizedInput.checked,
        dewormed: dewormedInput.checked,
        breed: breedInput.value, 
        date: new Date(),
        bmi: "?"
    }
    saveToStorage('petArr', JSON.stringify(petArr));
    console.log(petArr[0]);
    renderTableData(petArr);
}
//hien gia tri date rut gon
function displayDate(date) {
    if (typeof date === 'string') {
        return date;
    }else if(typeof date === 'object') {
     return JSON.parse(JSON.stringify(date));
    }
}