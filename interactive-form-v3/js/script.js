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
const shirtDesigns = document.getElementById('shirt-designs');
const colorOptions = document.getElementById('color');
colorOptions.disabled = true; 
//Event listener for Design 'select' element. 
shirtDesigns.addEventListener("change", (e) => {
    colorOptions.removeAttribute("disabled", false); 
    for(let i = 0; i < colorOptions.length; i++) {
        const targetValue = e.target.value; 
        const dataTheme = colorOptions[i].getAttribute("data-theme"); 
        if(targetValue === dataTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].select = true;  
        } else {
            colorOptions[i].hidden = true; 
            colorOptions[i].select = false; 
        }
    }
});

const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let activityTotalSum = 0;

//Create event listener for checkboxes. 
activities.addEventListener("change", (e) => {
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

//Payment info section 
const paymentMethod = document.getElementById('payment');

//Make credit card option the default option when the page is loaded. 
const defaultPayment = paymentMethod[1];
defaultPayment.defaultSelected = true;
const creditCardPayment = document.getElementById('credit-card');


const payPalPayment = document.getElementById('paypal');
payPalPayment.style.display = 'none';

const bitCoinPayment = document.getElementById('bitcoin');
bitCoinPayment.style.display = 'none';

//Eventlistener for payment method 
paymentMethod.addEventListener("change", (e) => {
        if(e.target.value === 'paypal') {
           creditCardPayment.style.display = 'none';
            payPalPayment.style.display = 'block';
        } 
        if(e.target.value === 'bitcoin') {
            creditCardPayment.style.display = 'none';
            payPalPayment.style.display = 'none'
            bitCoinPayment.style.display = 'block';
        }
        if (e.target.value === 'credit-card') {
            payPalPayment.style.display = 'none';
            bitCoinPayment.style.display = 'none';
            creditCardPayment.style.display = 'block';
        }
});

//Form validation 
const form = document.querySelector('form');
//Helper function for name input validation 
function nameValidator() {
    const nameValue = nameInput.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    if(nameIsValid === false) {
        validationFail(nameInput);
        return false;
    } else {
        validationPass(nameInput);
        return true;
    }
}

const emailElement = document.querySelector('#email');
//Helper function for email address input validation
function emailValidator() {
    const emailValue = emailElement.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    if(emailIsValid === false) {
        validationFail(emailElement);
        return false;
    } else {
        validationPass(emailElement);
        return true;
    }
}

//Helper function for activites selection validation  
const activitiesSection = document.getElementById('activities-box');

function activitiesValidator() {
const activitiesSelected = document.querySelectorAll('[type="checkbox"]:checked');
   if(activitiesSelected.length < 1) {
       validationFail(activitiesSection);
        return false; 
     }  else {
        validationPass(activitiesSection);
        return true; 
   }
 }

 //Helper function for credit card payment method 
const creditCardInput = document.getElementById('cc-num');
function creditCardValidator() {
  const creditCardValue = creditCardInput.value; 
  const creditCardIsValid = /^[0-9]{13}(?:[0-9]{3})?$/.test(creditCardValue);
  if (creditCardIsValid === false) {
    validationFail(creditCardInput);
    return false; 
  } else {
    validationPass(creditCardInput);
      return true; 
  }
}

//Helper function for zip code
const zipCodeInput = document.getElementById('zip');
function zipCodeValidator() {
    const zipCodeValue = zipCodeInput.value; 
    const zipIsValid = /^[0-9]{5}$/.test(zipCodeValue);
    if(zipIsValid === false) {
        validationFail(zipCodeInput);
        return false; 
    } else {
        validationPass(zipCodeInput);
        return true; 
    }

}

//Helper funcion for CVV
const cvvInput = document.getElementById('cvv');
function cvvValidator() {
    const cvvValue = cvvInput.value; 
    const cvvIsValid = /^[0-9]{3}$/.test(cvvValue);
    if(cvvIsValid === false) {
        validationFail(cvvInput);
        return false; 
    } else {
        validationPass(cvvInput);
        return true; 
    }
}

// Event listener for form validation 
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(!nameValidator() || !emailValidator() || !activitiesValidator() || 
       !creditCardValidator() || !zipCodeValidator() || !cvvValidator()) {
        e.preventDefault()
        console.log('One or more fields are invalid.');
    }
}); 

//Accessibility ac
const checkboxes = document.querySelectorAll('[type="checkbox"]');
//Loop over checkbox inputs listening for 'focus' and 'blur' events on targeted input. 
for(let i = 0; i < checkboxes.length; i++) {
    const parentElement = checkboxes[i].parentElement;
    checkboxes[i].addEventListener('focus', (e) => {
        parentElement.classList.add('focus');
    }) 
    checkboxes[i].addEventListener('blur', (e) => {
        parentElement.classList.remove('focus');
    })
}

//Validation helper functions for pass or fail
function validationPass(element) {
    element.parentElement.classList.add('valid');
    console.log(element.parentElement);
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'hidden';
}

function validationFail(element) {
    element.parentElement.classList.add('not-valid');
    console.log(element.parentElement);
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}



