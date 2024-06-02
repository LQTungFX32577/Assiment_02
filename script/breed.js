'use strict';

//khai bao doi tuong thuc thi
const type = document.getElementById('input-type');
const breed = document.getElementById('input-breed');
const tableBodyBreed = document.getElementById("tbody");
const nav = document.querySelector('#sidebar');
//tao hai mang chua du lieu cua breed cho moi loai thu cung

let breedArr = JSON.parse(getFromStorage("BreedArr")) ?? "[]";

//hieu ung nav
nav.addEventListener('mouseover', function(){

    nav.classList.remove('active');
   });
   nav.addEventListener('mouseout', function(){
       
       nav.classList.add('active');
      });
//kiem tra du lieu duoc nhap tu input
function breedtype() {
    let Arr = {
        type: type.value,
        breed: breed.value
    };
    //kiem tra de trong 
    if(type.value === 'Select Type' || breed.value.trim() === "" ){
        alert('please sign the information');
    }
    else {
        //luu du lieu vao BreedArr
    breedArr.push(Arr);
    saveToStorage("BreedArr", JSON.stringify(breedArr));
    renderTableData(breedArr);
    }

}
function renderTableData() {
    // breedArr = JSON.parse(getFromStorage("BreedArr")) ?? "[]";
    tableBodyBreed.innerHTML = '';
    //render data 
    breedArr.forEach((ArrBreed, idex) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td scope="col">${idex + 1}</td>
    <td scope="col">${ArrBreed.breed}</td>
    <td scope="col">${ArrBreed.type}</td>
    <td><button class="btn btn-danger" onclick="deleteBreed(${idex})">Delete</button>
    </td>`;
    tableBodyBreed.appendChild(row);
    });
}
function deleteBreed(idex) {
    // Confirm before deletePet
    if (confirm('Are you sure?')) {
        //deleted pet
        breedArr.splice(idex, 1);
        }
        saveToStorage("BreedArr", JSON.stringify(breedArr));
        renderTableData(breedArr);
        }