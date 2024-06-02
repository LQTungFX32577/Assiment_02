'use strict';
//khai bao cac doi tuong
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodySearch = document.getElementById("tbody");
const find = document.getElementById('find-btn');
const formEL = document.getElementById('container-form');
const nav = document.querySelector('#sidebar');
//truy cap vao storage de lay gia tri
 let breedArr = JSON.parse(getFromStorage("BreedArr")) ?? "[]";
 let petArr = JSON.parse(getFromStorage("petArr")) ?? "[]";

 //hieu ung nav
nav.addEventListener('mouseover', function(){

    nav.classList.remove('active');
   });
   nav.addEventListener('mouseout', function(){
       
       nav.classList.add('active');
      });

//hien thi danh sach thu cung
renderTableData(petArr);

//bat su kien nut find tim kiem thu cung 
find.addEventListener('click', function(){

    let petFind = petArr;
    if(idInput.value){
        petFind = petFind.filter((pet) => pet.id.includes(idInput.value));
    }

    if(nameInput.value) {
        petFind = petFind.filter((pet) => pet.name.includes(nameInput.value));
    }

    if(typeInput.value !== 'Select Type') {
        petFind = petFind.filter((pet) => pet.type === typeInput.value);
    }

    if(breedInput.value !== 'Select Breed') {
        petFind = petFind.filter((pet) => pet.breed === breedInput.value);
    }

    if(vaccinatedInput.checked === true) {
        petFind = petFind.filter((pet) => pet.vaccinated === true);
    }

    if(dewormedInput.checked === true) {
        petFind = petFind.filter((pet) => pet.dewormed === true);
    }

    if(sterilizedInput.checked === true) {
        petFind = petFind.filter((pet) => pet.sterilized === true);
    }
renderTableData(petFind);

});
function renderTableData(petArr) {
    tableBodySearch.innerHTML = "";

    petArr.forEach((pet) => {
     const row = document.createElement("tr");
     row.innerHTML = `<th scope = "row">${pet.id}</th>
     <td>${pet.name}</td>
     <td>${pet.age}</td>
     <td>${pet.type}</td>
     <td>${pet.weight}</td>
     <td>${pet.length}</td>
     <td>${pet.breed}</td>
     <td>
     <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi ${pet.vaccinated ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td><i class="bi ${pet.sterilized ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td><i class="bi ${pet.dewormed ? "bi-check-circle-fill" :  "bi-x-circle-fill"}"></i></td>
    <td>${displayDate(pet.date).slice(8,10)}/
        ${displayDate(pet.date).slice(5,7)}/
        ${displayDate(pet.date).slice(0,4)}
    </td> `
    tableBodySearch.appendChild(row);
    });
}
renderBreed();

function renderBreed() {
    breedArr.forEach(function(breed) {
        const option = document.createElement("option");
        option.innerHTML = `${breed.breed}`;
        breedInput.appendChild(option);
    });
}
//hien gia tri date rut gon
function displayDate(date) {
    if (typeof date === 'string') {
        return date;
    }else if(typeof date === 'object') {
     return JSON.parse(JSON.stringify(date));
    }
}