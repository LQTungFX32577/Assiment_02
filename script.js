 'use strict';
//khai bao cac doi tuong 
const nav = document.querySelector('#sidebar');
// gan doi tuong cho cac dom element
const submitBtn = document.getElementById("submit-btn");
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
const tableBodyEl = document.getElementById("tbody");
const showPet = document.getElementById("healthy-btn");
const bmi = document.getElementById("calc-btn");
let value = idInput.value;
let type1 = typeInput.options[typeInput.selectedIndex].text;  

//  let breedArr = JSON.parse(getFromStorage("BreedArr")) ?? "[]";
// Bổ sung Animation cho Sidebar 
//bat su kien click vao sidebar

nav.addEventListener('mouseover', function(){

 nav.classList.remove('active');
});
nav.addEventListener('mouseout', function(){
    
    nav.classList.add('active');
   });


//kiem tra key petArr ? neu co thi tien hanh them du lieu vao : neu khong thi tao mot mang moi.

let petArr = JSON.parse(getFromStorage("petArr")) ??'[]';
let breedArr = [];

// tao mang petarr va luu gia tri 


//render data 
function renderTableData(petArr) {
    tableBodyEl.innerHTML = '';
    //luu du lieu vao petArr 
    for(let i = 0; i < petArr.length; i++){
    const row = document.createElement('tr');
    row.innerHTML =
    `<th scope="row">P${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${(petArr[i].breed)}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${petArr[i].vaccinated ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td><i class="bi ${petArr[i].sterilized ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td><i class="bi ${petArr[i].dewormed ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td>${petArr[i].bmi}</td>
    <td>${displayDate(petArr[i].date).slice(8,10)}/
        ${displayDate(petArr[i].date).slice(5,7)}/
        ${displayDate(petArr[i].date).slice(0,4)}
    </td> 
    <td><button class="btn btn-danger" onclick="deletePet(${petArr[i].id})">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
 }
};

typeInput.addEventListener('click', renderBreed);
function renderBreed(breedArr) {
    breedInput.innerHTML = "<option>Select breed</option>";
    breedArr = JSON.parse(getFromStorage("BreedArr")) ?? "[]";
    
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
//tao chuc nang hien thi pet khoe manh
let Healthycheck = true;
showPet.addEventListener('click', function() {
     if(Healthycheck === true){ 
         // hien helthy pet va doi button tha
         let healthyPetArr = []; // tao mot array chua thu cung khoe manh
         for(let i = 0; i < petArr.length; i++){
            //kiem tra co du 3 yeu to de thu cung khoe manh hay khong
             if(petArr[i].vaccinated && petArr[i].sterilized && petArr[i].dewormed){
                //them thu cung du dieu kien vao array moi tao
                 healthyPetArr.push(petArr[i]);  
                 console.log(healthyPetArr);
                 console.log(petArr);
             }
         }
         //xuat ra man hinh array cac thu cung khoe manh
         renderTableData(healthyPetArr);
         // doi nut thanh show all pet
         showPet.textContent="Show All Pet";
         
         Healthycheck = false;
        }else {
        //xuat ra man hinh array cac thu cung
         renderTableData(petArr);
         //doi nut thanh show healthy pet
         showPet.textContent="Show Healthy Pet";
         Healthycheck = true;
     }
});
 function deletePet(petIndex) {
    // Confirm before deletePet
    if (confirm('Are you sure?')) {
        //deleted pet
        petArr.splice(petIndex, 1);
        }
        saveToStorage('petArr', JSON.stringify(petArr));
        renderTableData(petArr);
        }
// tinh bmi khi nhan nut calculate bmi
function calcBMI() {
    //kiem tra type thu cung sau do tinh toan ra bmi 
    for(let i=0; i<petArr.length; i++){ 
        if(petArr[i].type == 'Dog'){
            let BMI = (petArr[i].weight * 703) / petArr[i].length ** 2;
            //gan bmi moi
            petArr[i].bmi = BMI.toFixed(2); 
        }else {
            let BMI = (petArr[i].weight * 886) / petArr[i].length ** 2;
            //gan bmi moi
            petArr[i].bmi = BMI.toFixed(2); 
        }
    }
    //dua du lieu ra man hinh
    renderTableData(petArr);
};
//lay du lieu tu form va luu vao storage
function addPet() {
    let dataPet = {
        id: idInput.value, /*? idInput.value : alert('ID must be unique!'),*/
        name: nameInput.value,
        age: parseInt(ageInput.value), /*>= 1 && parseInt(ageInput.value) <= 15 ? ageInput.value : alert("Age must be between 1 and 15!"),*/ 
        type: typeInput.value, /*!= type1 ? typeInput.value : alert("Please select Type!"),*/
        weight: weightInput.value, /*>=1 && weightInput.value <=15 ? weightInput.value : alert("Weight must be between 1 and 15!"),*/ 
        length: lengthInput.value, /*>=1 && lengthInput.value <=100 ? lengthInput.value : alert("Length must be between 1 and 100!"),*/ 
        color: colorInput.value,
        breed: breedInput.value, /*!= breed1 ? breedInput.value : alert("Please select Breed!"),*/
        vaccinated: vaccinatedInput.checked,
        sterilized: sterilizedInput.checked,
        dewormed: dewormedInput.checked,
        date: new Date(),
        bmi: "?",
    }
    //kiem tra thong tin hop le
        function validateData (dataPet) {
        let valid = true;
        //kiem tra o trong 
        if(dataPet.id.trim() ==="" ){
            alert('ID must be sign!');
            valid = false;
        }
        if(dataPet.name.trim() ===""){
            alert('Name must be sign!');
            valid = false;
        }
        if(dataPet.age < 1 || dataPet.age > 15){
            alert("Age must be between 1 and 15!");
            valid = false;
        }else if(isNaN(dataPet.age)) {
            alert("Age must be sign!");
            valid = false;
        }
        if(dataPet.type == type1 ) {
            alert("Please select Type!");
            valid = false;
        }
        if(dataPet.weight < 1 || dataPet.weight > 15 ){
            alert("Weight must be between 1 and 15!");
            valid = false;
        }
        if(dataPet.length < 1 || dataPet.length > 100 ){
            alert("length must be between 1 and 100!");
            valid = false;
        }
        if(dataPet.breed === "Select breed" ) {
            alert("Please select Breed!");
            valid = false;
        }
        //kiem tra id xem co trung khong
        for(let i = 0; i<petArr.length; i++){
           if(dataPet.id === petArr[i].id){
            alert('id must be unique!');
            valid = false;
            break;
           }
        }   

          return valid;
    }
    //kiem tra du lieu hop le
    const valid = validateData(dataPet);
     if(valid)
     {
    //  tao mang petarray de luu gia tri cua datapet va them vao mang
        //truyen gia tri datapet vao petArr
        petArr.push(dataPet);   
        //luu vao storage
        saveToStorage("petArr", JSON.stringify(petArr));
        console.log(petArr);
        renderTableData(petArr);
        clearInput();
     }
     else {
        alert('Invalid Information');
        }
    }
    //hien gia tri date rut gon
    function displayDate(date) {
        if (typeof date === 'string') {
            return date;
        }else if(typeof date === 'object') {
         return (JSON.stringify(date));
        }
    }
     