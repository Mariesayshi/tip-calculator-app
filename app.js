const tipAmount = document.querySelector(".tipResAmount");
const totalAmount = document.querySelector(".totalResAmount");
const bill = document.querySelector("#bill");
const tipOptions = document.querySelectorAll(".tipOption");
const numOfPeople = document.querySelector("#numPeople");
const resetBtn = document.querySelector(".resetBtn");
const customTipInput = document.querySelector('#customTip');
let tipPerc = 0;
let tipCalc = 0;
let totalCalc = 0;
let customTip = false;

emptyBill = true;
emptyPerc = true;
emptyNumOfPeople = true;

for (let tipOption of tipOptions) {
  tipOption.addEventListener("click", (e) => {
    for (let option of tipOptions) {
      customTip = false;
      if (option.classList.contains("checkedTip")) {
        option.classList.remove("checkedTip");
      }
    }
    tipOption.classList.add("checkedTip");
    if (e.target.id !== "customTip") {
      tipPerc = e.target.innerHTML;
    } else {
      customTip = true;
    }
  });
}

resetBtn.addEventListener("click", (e) => {
  if (!customTip) {
    tipCalc =
      (parseInt(parseFloat(bill.value)) * parseFloat(tipPerc)) /
      100 /
      parseFloat(numOfPeople.value);
  } else {
    tipPerc = findCustomTipPerc();
    tipCalc =
      (parseInt(parseFloat(bill.value)) * parseFloat(tipPerc)) /
      100 /
      parseFloat(numOfPeople.value);
  }

  if (bill.value === "" || parseFloat(bill.value) === 0) {
    bill.classList.add("displayError");
  } else {
    emptyBill = false;
  }

  if (numOfPeople.value === "" || parseFloat(numOfPeople.value) === 0) {
    numOfPeople.classList.add("displayError");
  } else {
    emptyNumOfPeople = false;
  }

  if (tipPerc === 0 || tipPerc === "") {
    tipOptions[5].classList.add("displayError");
  } else {
    emptyPerc = false;
  }

  if (!emptyBill && !emptyNumOfPeople && !emptyPerc) {
    bill.classList.remove("displayError");
    numOfPeople.classList.remove("displayError");
    tipOptions[5].classList.remove("displayError");

    tipCalc = parseFloat(tipCalc.toFixed(2));
    tipAmount.innerHTML = `$${tipCalc}`;
    totalCalc =
      parseFloat(bill.value) / parseFloat(numOfPeople.value) + tipCalc;
    totalCalc = parseFloat(totalCalc.toFixed(2));
    totalAmount.innerHTML = `$${totalCalc}`;
    emptyPerc = true;
    emptyNumOfPeople = true;
    emptyBill = true;
  }
});

const findCustomTipPerc = () => {
  for (let tipOption of tipOptions) {
    if (tipOption.classList.contains("checkedTip")) {
      return tipOption.value;
    }
  }
};
