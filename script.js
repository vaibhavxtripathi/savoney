AOS.init();

const incomeForm = document.querySelector("#incomeForm");
const budgetForm = document.querySelector("#budgetForm");
const expenseForm = document.querySelector("#expenseForm");
const incomeHistory = document.querySelector(".incomeHistory");
const incomeAmount = document.querySelector("#incomeAmount");
const incomeDate = document.querySelector("#incomeDate");
const incomeRemark = document.querySelector("#incomeRemark");
const expenseHistory = document.querySelector(".expenseHistory");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseDate = document.querySelector("#expenseDate");
const expenseRemark = document.querySelector("#expenseRemark");
const incomeType = document.querySelector("#incomeType");
const budgetType = document.querySelector("#budgetType");
const expenseType = document.querySelector("#expenseType");
const totalBalance = document.querySelector(".totalBalance");
const totalIncome = document.querySelector(".totalIncome");
const totalExpense = document.querySelector(".totalExpense");
const budgetAmount = document.querySelector("#budgetAmount");

let xValues = JSON.parse(localStorage.getItem("xValues")) || [];
let yValues = JSON.parse(localStorage.getItem("yValues")) || [];
let x2Values = JSON.parse(localStorage.getItem("x2Values")) || [];
let y2Values = JSON.parse(localStorage.getItem("y2Values")) || [];
let budgetIdCounter = parseInt(localStorage.getItem("budgetIdCounter")) || 0;
let budgetMap = JSON.parse(localStorage.getItem("budgetMap")) || {};

// Load stored values
totalIncome.textContent = localStorage.getItem("totalIncome") || "0";
totalExpense.textContent = localStorage.getItem("totalExpense") || "0";
totalBalance.textContent = localStorage.getItem("totalBalance") || "0";

// Load saved income and expense history
incomeHistory.innerHTML = localStorage.getItem("incomeHistory") || "";
expenseHistory.innerHTML = localStorage.getItem("expenseHistory") || "";

// Functions for localStorage updates
function saveToLocalStorage() {
    localStorage.setItem("xValues", JSON.stringify(xValues));
    localStorage.setItem("yValues", JSON.stringify(yValues));
    localStorage.setItem("x2Values", JSON.stringify(x2Values));
    localStorage.setItem("y2Values", JSON.stringify(y2Values));
    localStorage.setItem("budgetIdCounter", budgetIdCounter.toString());
    localStorage.setItem("budgetMap", JSON.stringify(budgetMap));
    localStorage.setItem("totalIncome", totalIncome.textContent);
    localStorage.setItem("totalExpense", totalExpense.textContent);
    localStorage.setItem("totalBalance", totalBalance.textContent);
    localStorage.setItem("incomeHistory", incomeHistory.innerHTML);
    localStorage.setItem("expenseHistory", expenseHistory.innerHTML);
}

function resetData() {
    localStorage.clear();
    location.reload();
}

// Sidebar reset functionality
document.querySelector('#mySidenav a[href="#pageName"]').addEventListener("click", resetData);

incomeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let amount = Number(incomeAmount.value);
    let incomeDateVal = incomeDate.value;
    let incomeRemarkVal = incomeRemark.value;
    let incomeTypeVal = incomeType.value;
    xValues.push(amount);
    yValues.push(incomeRemarkVal);
    updateIncomeChart();
    const historyItem = document.createElement("div");
    historyItem.innerHTML = `<h2>${amount} from ${incomeRemarkVal} on ${incomeDateVal} as ${incomeTypeVal}</h2>`;
    incomeHistory.appendChild(historyItem);
    totalIncome.textContent = Number(totalIncome.textContent) + amount;
    totalBalance.textContent = Number(totalIncome.textContent) - Number(totalExpense.textContent);
    saveToLocalStorage();
});

budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (Number(budgetAmount.value) <= Number(totalBalance.textContent)) {
        let budgetTypeVal = budgetType.value;
        let uniqueBudgetId = `budget-${budgetIdCounter++}`;
        budgetMap[budgetTypeVal] = uniqueBudgetId;
        expenseType.innerHTML += `<option value="${budgetTypeVal}">${budgetTypeVal}</option>`;
        const maxBudget = Number(budgetAmount.value);
        const budgetContainer = document.createElement("div");
        budgetContainer.classList.add("budgetContainer");
        budgetContainer.innerHTML = `
            <div class="budgetName">${budgetTypeVal}</div>
            <div class="progressBarContainer" id="${uniqueBudgetId}"></div>
        `;
        document.querySelector(".budgetBarDiv").appendChild(budgetContainer);
        updateBudgetChart(maxBudget, 0, uniqueBudgetId);
        saveToLocalStorage();
    } else {
        alert("Your balance is insufficient to allot this budget.");
    }
});

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let amount = Number(expenseAmount.value);
    let expenseDateVal = expenseDate.value;
    let expenseRemarkVal = expenseRemark.value;
    let expenseTypeVal = expenseType.value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid expense amount.");
        return;
    }

    const maxBudget = Number(budgetAmount.value);
    const totalExpenses = x2Values.reduce((acc, val) => acc + val, 0);
    const budgetId = budgetMap[expenseTypeVal];
    if (!budgetId) {
        alert("Selected budget does not exist.");
        return;
    }

    if (totalExpenses + amount <= maxBudget) {
        x2Values.push(amount);
        y2Values.push(expenseTypeVal);
        updateExpenseChart();
        updateBudgetChart(maxBudget, totalExpenses + amount, budgetId);
        const historyItem = document.createElement("div");
        historyItem.innerHTML = `<h2>${amount} for ${expenseRemarkVal} on ${expenseDateVal} as ${expenseTypeVal}</h2>`;
        expenseHistory.appendChild(historyItem);
        totalExpense.textContent = Number(totalExpense.textContent) + amount;
        totalBalance.textContent = Number(totalIncome.textContent) - Number(totalExpense.textContent);
        saveToLocalStorage();
    } else {
        alert("Your budget is insufficient to make this expense.");
    }
});

let incomeColors = [
    'rgb(232, 85, 75)', 'rgb(255, 165, 0)', 'rgb(255, 223, 73)',
    'rgb(64, 195, 189)', 'rgb(55, 103, 255)', 'rgb(0, 98, 140)'
];
let expenseColors = [
    'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)',
    'rgb(153, 102, 255)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)'
];

function updateIncomeChart() {
    new Chart("incomeChart", {
        type: "doughnut",
        data: { labels: yValues, datasets: [{ backgroundColor: incomeColors, data: xValues }] },
        options: { title: { display: true, text: "Income Sources" }, responsive: true }
    });
}

let progressBarCache = {};

function updateBudgetChart(maxValue, currentValue, id) {
    if (!progressBarCache[id]) {
        progressBarCache[id] = new ProgressBar.Line(document.getElementById(id), {
            strokeWidth: 4,
            color: '#4caf50',
            trailColor: '#e0e0e0',
            trailWidth: 4
        });
    }
    progressBarCache[id].animate(currentValue / maxValue);
}

function updateExpenseChart() {
    new Chart("expenseChart", {
        type: "doughnut",
        data: { labels: y2Values, datasets: [{ backgroundColor: expenseColors, data: x2Values }] },
        options: { title: { display: true, text: "Expense Sources" }, responsive: true }
    });
}

// Initialize Charts on Page Load
if (xValues.length) updateIncomeChart();
if (x2Values.length) updateExpenseChart();

//Side Nav
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("overlay").classList.add("active");
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("overlay").classList.remove("active");
}