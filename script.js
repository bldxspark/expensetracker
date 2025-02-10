// Selecting elements
const expenseForm = document.getElementById("expense_form");
const expenseInput = document.getElementById("expense_input");
const expenseList = document.getElementById("expense_list");
const totalSpan = document.getElementById("total");
const expenseContainer = document.getElementById("expense_cont");
const errorMsg = document.getElementById("errormsg");
const expenseNameInput = document.getElementById("name"); 

let totalExpense = 0;
let expenses = []; 
let expenseNames = [];


expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let expenseValue = parseFloat(expenseInput.value.trim());
    let expenseName = expenseNameInput.value.trim();

    if (!isNaN(expenseValue) && expenseValue > 0 && expenseName !== "") {
        errorMsg.textContent = "";
        errorMsg.classList.add("hidden");
        expenses.push(expenseValue);
        expenseNames.push(expenseName); 
        totalExpense += expenseValue;

        updateExpenseList();
        updateTotalExpense();

    
        expenseContainer.classList.remove("hidden");
        expenseInput.value = "";
        expenseNameInput.value = "";
    } else {
        errorMsg.textContent = "Please enter a valid expense name and amount!";
        errorMsg.classList.remove("hidden");
    }
});

function updateExpenseList() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        let listItem = document.createElement("li");
        listItem.classList.add("expense-item");
        listItem.innerHTML = `${expenseNames[index]}: ₹${expense.toFixed(2)} 
            <button onclick="removeExpense(${index})">Delete</button>`;
        expenseList.appendChild(listItem);
    });
}


function updateTotalExpense() {
    totalSpan.textContent = totalExpense.toFixed(2);
}
function removeExpense(index) {
    totalExpense -= expenses[index];
    expenses.splice(index, 1);
    expenseNames.splice(index, 1); 
    updateExpenseList();
    updateTotalExpense();
    if (expenses.length === 0) {
        expenseContainer.classList.add("hidden");
    }
}
