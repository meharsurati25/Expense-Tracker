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
const category_input = document.getElementById("category_input")
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
    setfilteractive(All);
    render_transaction();
});

Credit.addEventListener("click", function () {
    currentfilter = "credit";
    setfilteractive(Credit);
    render_transaction();
});

Debit.addEventListener("click", function () {
    currentfilter = "debit";
    setfilteractive(Debit);
    render_transaction();
});

cross.addEventListener("click", function(){
    transaction_feature.classList.toggle("hidden");
})

// set filter active
function setfilteractive(button){
    document.querySelectorAll(".filter-btn").forEach(btn=>{
        btn.classList.remove("filter-btn-active");
        btn.classList.add("filter-btn");
    });

    button.classList.add("filter-btn-active");
}

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
function create_transaction(type){

    const amount = Number(transaction_input.value);
    const category = category_input.value;

    if(!amount){
        return;
    }

    const expense = {
        id: Date.now(),
        amount: amount,
        sign: type,
        category: category,
        date: new Date().toLocaleString()
    };

    expenses.push(expense);

    transaction_input.value = "";

    save_transaction();
    render_transaction();
    calc_balance();
}

function create_transaction_element(expense){

    const expense_item = document.createElement("li");

    const info = document.createElement("div");
    info.classList.add("transaction-info");

    const amount = document.createElement("span");
    amount.textContent =
        (expense.sign === "credit" ? "+ ₹" : "- ₹") + expense.amount;

    if(expense.sign === "credit"){
        amount.classList.add("credit");
    } else {
        amount.classList.add("debit");
    }

    const category = document.createElement("p");
    category.textContent = expense.category;

    const date = document.createElement("small");
    date.textContent = expense.date;

    info.appendChild(amount);
    info.appendChild(category);
    info.appendChild(date);

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.classList.add("deleteBtn");

    deletebtn.addEventListener("click", function(){

        expenses = expenses.filter(t => t.id !== expense.id);

        save_transaction();
        render_transaction();
        calc_balance();

    });

    expense_item.appendChild(info);
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