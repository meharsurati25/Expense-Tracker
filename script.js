// Expense list
let expenses = [];

// get elements from HTML
const All = document.getElementById("all");
const Credit = document.getElementById("credit");
const Debit = document.getElementById("debit");
const transaction_input  = document.getElementById("transaction_input")

// Current filter state
let currentfilter = "all";

// filter buttons
All.addEventListener("click", function(){
    currentfilter = "all";
    setActiveButton(this);
})

Credit.addEventListener("click", function(){
    currentfilter = "credit";
})

Debit.addEventListener("click", function(){
    currentfilter = "debit";
})


// Add new transaction
function add_transaction(){
    const transaction_text = transaction_input.ariaValueMax;

    if(transaction_text === ""){
        return;
    }
}