const tipsButtons = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('.customTip');

const billInput = document.querySelector('#bill');
const peopleInput = document.querySelector('#people');

const tipAmount = document.querySelector('.tip_amount');
const total = document.querySelector('.total');

const errorLabel = document.querySelector('.error-label');

const resetButton = document.querySelector('.blocked');


let selectedTip;

let bill;
let people;
let tip;

tipsButtons.forEach(tipButton => {
    tipButton.addEventListener('click', (event) => {
        event.preventDefault();
        selectedTip = document.querySelector('.selected');

        if(selectedTip) {
            if(tipButton === selectedTip) {
                tipButton.classList.remove('selected');
            } else {
                selectedTip.classList.remove('selected');
                tipButton.classList.add('selected');
            }
        } else {
            tipButton.classList.add('selected');
        }

        tip = tipButton.value;
        calculate();
    
    });
});

customTipInput.addEventListener('click', () => {
    selectedTip = document.querySelector('.selected');
    if(selectedTip) {
        selectedTip.classList.toggle('selected');
    }
});

customTipInput.addEventListener('input', () => {
    tip = (customTipInput.value) / 100;
    calculate();
});

peopleInput.addEventListener('input', () => {
    errorLabel.classList.add('hidden');
    peopleInput.classList.remove('input--people-error');
    if(peopleInput.value > 0 || peopleInput.value === "") {
        people = peopleInput.value;
        calculate();
    } else {
        errorLabel.classList.toggle('hidden');
        peopleInput.classList.toggle('input--people-error');
    }
});

billInput.addEventListener('input', () => {
    bill = billInput.value;
    calculate();
});

resetButton.addEventListener('click', () => {

    selectedTip = document.querySelector('.selected');
    if(selectedTip) {
        selectedTip.classList.toggle('selected');
    } else {
        customTipInput.value = "";
    }

    bill = 0;
    tip = 0;
    people = 0;

    billInput.value = "";
    peopleInput.value = "";

    total.textContent =  "$0.00";
    tipAmount.textContent = "$0.00"; 

    resetButton.classList.add('blocked');
    resetButton.classList.remove('reset__button');
    
});

function calculate(){

    if(bill > 0 && people > 0 && tip > 0) {
        let tipPerPerson = (bill * tip) / people;
        let totalPerPerson = (bill / people) + tipPerPerson;

        total.textContent =  `$${totalPerPerson.toFixed(2)}`;
        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;        
    }

    resetButton.classList.remove('blocked');
    resetButton.classList.add('reset__button');
}


