// ===============================
// Expense storage
// ===============================
let expenses = [];

// ===============================
// Get elements from HTML
// ===============================
const add_transaction_btn = document.getElementById("add_transaction");
const expense_list = document.getElementById("expense_list");

const transaction_feature = document.getElementById("transaction_feature");
const balance_span = document.getElementById("balance");

const All = document.getElementById("all");
const Credit = document.getElementById("credit");
const Debit = document.getElementById("debit");

const transaction_input = document.getElementById("transaction_input");
const cross = document.getElementById("cross");
const credit_trans = document.getElementById("credit_trans");
const debit_trans = document.getElementById("debit_trans");

// ===============================
// Current filter state
// ===============================
let currentfilter = "all";

// ===============================
// Show / Hide transaction input
// ===============================
add_transaction_btn.addEventListener("click", function () {
    transaction_feature.classList.toggle("hidden");
});

// ===============================
// Filter buttons
// ===============================
All.addEventListener("click", function () {
    currentfilter = "all";
    render_transaction();
});

Credit.addEventListener("click", function () {
    currentfilter = "credit";
    render_transaction();
});

Debit.addEventListener("click", function () {
    currentfilter = "debit";
    render_transaction();
});

cross.addEventListener("click", function(){
    transaction_feature.classList.toggle("hidden");
})

load_transactions();

// ===============================
// Transaction buttons
// ===============================
credit_trans.addEventListener("click", function () {
    create_transaction("credit");
});

debit_trans.addEventListener("click", function () {
    create_transaction("debit");
});

// ===============================
// Create a new transaction
// ===============================
function create_transaction(type) {

const transaction_text = transaction_input.value;

    // Prevent empty input
    if (transaction_text === "") {
        return;
    }

    // Create transaction object
    const expense = {
        amount: transaction_text,
        sign: type
    };

    expenses.push(expense);
    save_transaction();
    render_transaction();
    calc_balance();

}

function create_transaction_element(expense){
    const expense_item = document.createElement("li");

    const expense_span = document.createElement("span");
    expense_span.textContent = expense.amount;

    if(expense.sign == "credit"){
        expense_span.classList.remove("debit");
        expense_span.classList.add("credit");
    }
    else{
        expense_span.classList.remove("credit");
        expense_span.classList.add("debit");
    }

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.classList.add("deleteBtn");

    // delete expense
    deletebtn.addEventListener("click", function(){
        expenses = expenses.filter(t => t !== expense);

        save_transaction();
        render_transaction();
        calc_balance();
    })

    expense_item.appendChild(expense_span);
    expense_item.appendChild(deletebtn);

    expense_list.appendChild(expense_item);

}

function save_transaction(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function load_transactions(){
    const stored_transaction = localStorage.getItem("expenses");

    if(stored_transaction){
        expenses = JSON.parse(stored_transaction);
        render_transaction();
        calc_balance();
    }
}

function render_transaction(){
    expense_list.innerHTML = "";

    expenses.forEach(function(expense){
        if(currentfilter == "all"){
            create_transaction_element(expense);
            return;
        }
        else{
            if(currentfilter === "credit" && expense.sign !== "credit"){
                return;
            }

            if(currentfilter === "debit" && expense.sign !== "debit"){
                return;
            }
        }

        create_transaction_element(expense);
    });
}

function calc_balance(){
    let balance = 0;
    expenses.forEach(function(expense){
        if(expense.sign === "credit"){
            balance += Number(expense.amount);
        }
        else{
            balance -= Number(expense.amount);
        }
    })

    balance_span.textContent = `Balance: ₹${balance}`;
}