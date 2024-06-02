'use strict';
let data1 = {
    id: 0,
    name: "Tom",
    age: 4, /*>= 1 && parseInt(ageInput.value) <= 15 ? ageInput.value : alert("Age must be between 1 and 15!"),*/ 
    type: "Cat", /*!= type1 ? typeInput.value : alert("Please select Type!"),*/
    weight: 15, /*>=1 && weightInput.value <=15 ? weightInput.value : alert("Weight must be between 1 and 15!"),*/ 
    length: 20, /*>=1 && lengthInput.value <=100 ? lengthInput.value : alert("Length must be between 1 and 100!"),*/ 
    color: "#000",
    breed: "Tabby", /*!= breed1 ? breedInput.value : alert("Please select Breed!"),*/
    vaccinated: true,
    sterilized: true,
    dewormed: true,
    date: new Date(),
    bmi: "?",
}
if(!getFromStorage("petArr")){
saveToStorage("petArr", JSON.stringify([data1]));
}
let breed1 = {
    type: "Dog",
    breed: "husky"
}
if(!getFromStorage("BreedArr")){
saveToStorage("BreedArr", JSON.stringify([breed1]));
}

//luu gia tri bang local storage
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}
//lay gia tri tu storage theo key tuong ung
function getFromStorage(key, defaultVal) {
    return localStorage.getItem(key) ?? defaultVal;
}
