
//Basic Info Section
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

 //T-shirt Info Section
const shirtDesigns = document.getElementById('shirt-designs');
const colorOptions = document.getElementById('color');
//Disable color select element.
colorOptions.disabled = true; 
//Event listener for Design 'select' element. 
shirtDesigns.addEventListener("change", (e) => {
    colorOptions.removeAttribute("disabled", false); 
    for(let i = 0; i < colorOptions.length; i++) {
        const targetValue = e.target.value; 
         const dataTheme = colorOptions.children[i].getAttribute("data-theme"); 
        if(targetValue !== dataTheme) {
            colorOptions.children[i].hidden = true;
                 colorOptions.children[i].removeAttribute('selected');  
             } else {
                 colorOptions.children[i].hidden = false; 
                 colorOptions.children[i].setAttribute('selected', true); 
             }
    }
});


//Register For Activities Section
const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let activityTotalSum = 0;

//Event listener for checkboxes. 
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

//Payment Info Section 
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
const valid = true; 
const notValid = false; 
//Helper function for name input validation 
function nameValidator() {
    const nameValue = nameInput.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    if(nameIsValid === false) {
        validationFail(nameInput);
        return notValid;
    } else {
        validationPass(nameInput);
        return valid;
    }
}

const emailElement = document.querySelector('#email');
//Helper function for email address input validation
function emailValidator() {
    const emailValue = emailElement.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    if(emailIsValid === false) {
        validationFail(emailElement);
        return notValid;
    } else {
        validationPass(emailElement);
        return valid;
    }
}

const activitiesSection = document.getElementById('activities-box')
//Helper function for activites selection   
function activitiesValidator() {
const activitiesSelected = document.querySelectorAll('[type="checkbox"]:checked');;
   if(activitiesSelected.length < 1) {
       validationFail(activitiesSection);
        return notValid; 
     }  else {
        validationPass(activitiesSection);
        return valid; 
   }
 }

 //Helper function for credit card payment method 
const creditCardInput = document.getElementById('cc-num');
function creditCardValidator() {
  const creditCardValue = creditCardInput.value; 
  const creditCardIsValid = /^[0-9]{13}(?:[0-9]{3})?$/.test(creditCardValue);
  if (creditCardIsValid === false) {
    validationFail(creditCardInput);
    return notValid; 
  } else {
    validationPass(creditCardInput);
      return valid; 
  }
}

//Helper function for zip code
const zipCodeInput = document.getElementById('zip');
function zipCodeValidator() {
    const zipCodeValue = zipCodeInput.value; 
    const zipIsValid = /^[0-9]{5}$/.test(zipCodeValue);
    if(zipIsValid === false) {
        validationFail(zipCodeInput);
        return notValid; 
    } else {
        validationPass(zipCodeInput);
        return valid; 
    }

}

//Helper function for CVV
const cvvInput = document.getElementById('cvv');
function cvvValidator() {
    const cvvValue = cvvInput.value; 
    const cvvIsValid = /^[0-9]{3}$/.test(cvvValue);
    if(cvvIsValid === false) {
        validationFail(cvvInput);
        return notValid; 
    } else {
        validationPass(cvvInput);
        return valid; 
    }
}

// Event listener for form validation 
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(!nameValidator()) {
        e.preventDefault()
    }  
    if (!emailValidator()) {
        e.preventDefault()
    }  
    if (!activitiesValidator()) {
        e.preventDefault()
    }
    if(paymentMethod.value === 'credit-card') {
       if(!creditCardValidator()){
        e.preventDefault()
       } 
      if(!zipCodeValidator()) {
        e.preventDefault()
      }
       if (!cvvValidator()) {
        e.preventDefault()
       }
    }
}); 

//Accessibility 
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
    element.parentElement.lastElementChild.style.display = 'none';
    console.log(element.parentElement);
    element.parentElement.classList.remove('not-valid');
}
function validationFail(element) {
    element.parentElement.classList.add('not-valid');
    console.log(element.parentElement);
    element.parentElement.lastElementChild.style.display = 'block';   
}






