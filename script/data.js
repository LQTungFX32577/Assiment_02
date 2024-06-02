'use strict';
const nav = document.querySelector('#sidebar');
const importData = document.getElementById('import-btn');
const exportData = document.getElementById('export-btn');
const dataInput = document.getElementById('input-file');


//event export
exportData.addEventListener('click', function(){
    const isexport = confirm("do you want to export ?"); 
    if (isexport) {
        saveFile ();
    }
});

//luu du lieu tai xuong
function saveFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)],{
   type: "application/json",
  });
  saveAs(blob, "petData.json");
}

//event import
importData.addEventListener('click', function (){
//kiem tra xem co file chua
if(!dataInput.value) {
    alert('file is empty');

}else {
    const isimport = confirm('Are you sure to import ?');
    if (isimport) {
        const file = dataInput.files[0];
        const reader = new FileReader();
        //load du lieu tu file
        reader.addEventListener('load', function() {
        const validateFile = checkFile(JSON.parse(reader.result));
        if(validateFile) {
            saveToStorage('petArr', JSON.parse(reader.result));
            alert('success!');
        }
        },
        false
        );
        if(file) {
            reader.readAsText(file);
        }
        dataInput.value="";
    }
}
}); 

function checkFile(Data) {
    if(!(Data instanceof Array)) {
        alert('error file not corect form');
        return false;
    }

    if(!PetObject(Data)) {
        return false;
    }
    
    if(!validateFile(Data)) {
        return false;
    }
    
    return false;
}

function PetObject(Data) {
    if(!Data.every((item) => item instanceof Object)) {
        alert('file not allowed Object error');
        return false;
    }
    
    const OK = Data.every((item) => {
        return(
            Object.keys(item).length === 12 &&
            item.hasOwnProperty('id') &&
            item.hasOwnProperty('name') &&
            item.hasOwnProperty('age') &&
            item.hasOwnProperty('type') &&
            item.hasOwnProperty('weight') &&
            item.hasOwnProperty('length') &&
            item.hasOwnProperty('color') &&
            item.hasOwnProperty('breed') &&
            item.hasOwnProperty('vaccinated') &&
            item.hasOwnProperty('dewormed') &&
            item.hasOwnProperty('sterilized') &&
            item.hasOwnProperty('date') 

        );
    });
    if(!OK) {
        alert('file not allowed');
        return false;
    }
    return false;
}
function validate(Data) {
    return dataInput.every(function (pet){
        if(pet.id.trim().length ===0) {
            alert('id not allowed');
            return false;
        }
        
        if(pet.name.trim().length ===0) {
            alert('name not allowed');
            return false;
        }

        pet.age = parseInt(pet.age);
        if(isNaN(pet.age) || pet.age < 1 || pet.age > 15 ) {
            alert('age not allowed');
            return false;
        }
            pet.weight = parseInt(pet.weight);
            if(isNaN(pet.weight) || pet.weight < 1 || pet.weight > 15 ) {
                alert('weight not allowed');
                return false;    
        }
        pet.length = parseInt(pet.length);
        if(isNaN(pet.length) || pet.length < 1 || pet.age > 100 ) {
            alert('length not allowed');
            return false;
        }
        pet.length = parseInt(pet.length);
        if(isNaN(pet.length) || pet.length < 1 || pet.age > 100 ) {
            alert('length not allowed');
            return false;
        }

        if(pet.type.trim().length === 0) {
            alert('type is not allowed');
            return false;
        }

        if(pet.color.trim().length === 0) {
            alert('color is not allowed');
            return false;
        }
        if(pet.breed.trim().length === 0) {
            alert('breed is not allowed');
            return false;
        }

        if(pet.date.trim().length === 0) {
            alert('date is not allowed');
            return false;
        }

        if(typeof pet.vaccinated !== "boolean") {
            alert('checked error');
            return false;
        }

        if(typeof pet.sterilized !== "boolean") {
            alert('checked error');
            return false;
        }

        if(typeof pet.dewormed !== "boolean") {
            alert('checked error');
            return false;
        }
         let count = 1;
         for (let item of Data) {
            if( pet.id === item.id) {
                if(count > 1) {
                    alert("id must be unique");
                    return false;
                }
                count ++ ;
            }
         }
    });
}