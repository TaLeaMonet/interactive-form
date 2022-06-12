//Selects the input with the id of name and makes it the focus state on page load. 
const nameInput = document.getElementById('name');
nameInput.focus();
nameInput.select();


const jobRoleOption = document.getElementById('title');
//Selects the job option input and the optional field for 'other' job role. 
const otherJobRole = document.getElementById('other-job-role');
//Hide the 'other' job role field by default. 
otherJobRole.type = 'hidden';

//Event listener on the job role options. 'Other' job role option 
//should stay hidden unless the other option is selected. 
 jobRoleOption.addEventListener("change", () => {
    if(jobRoleOption.value === 'other'){
        otherJobRole.type = 'text';
    } else {
        otherJobRole.type = 'hidden';
    }
});

//Disable color select element. 
const shirtColors = document.getElementById('shirt-colors').getElementsByTagName('*');
for (let options of shirtColors) {
    options.disabled = true;
}

const shirtDesigns = document.getElementById('shirt-designs');
//Event listener for Design 'select' element. 
shirtDesigns.addEventListener("change", (e) => {
    if(e.target.value === 'js puns' ){
        for (let options of shirtColors) {
            options.disabled = false;
        }
        const colorOptions = document.getElementById('color');
    
        for (let options of colorOptions) {
            colorOptions[1].hidden  = false; 
            colorOptions[2].hidden = false; 
            colorOptions[3].hidden = false; 

            colorOptions[4].hidden  = true; 
            colorOptions[5].hidden = true; 
            colorOptions[6].hidden = true; 
        }
  
    } else if (e.target.value === 'heart js'){
        for (let options of shirtColors) {
            options.disabled = false;
        }
        const colorOptions = document.getElementById('color');
        for (let options of colorOptions) {
            colorOptions[1].hidden  = true; 
            colorOptions[2].hidden = true; 
            colorOptions[3].hidden = true;

            colorOptions[4].hidden  = false; 
            colorOptions[5].hidden = false; 
            colorOptions[6].hidden = false;  
        }  
    }
});

const activities = document.querySelectorAll('.activities input');
const activitiesCost = document.getElementById('activities-cost');
let activityTotalSum = 0;

//Create event listener for checkboxes. 
document.querySelector('.activities').addEventListener("change", (e) => {
    const activitySelected = e.target; 
    const dataCost = parseInt(activitySelected.getAttribute('data-cost'));
//If checked, increase total amount due. If unchecked, decrease total amount. 
    if(activitySelected.checked) {
        activityTotalSum += dataCost;  
    } else {
        activityTotalSum -= dataCost;
    }
    activitiesCost.innerHTML = `Total:$${activityTotalSum}`;
});





