import { populateTotal, populateTable, populateChart } from "./populate";
import { useIndexedDB } from "./IndexedDB";
import { transactions } from "./API";

export function sendTransaction(isAdding) {
    let nameEl = document.querySelector("#t-name");
    let amountEl = document.querySelector("#t-amount");
    let errorEl = document.querySelector(".form .error");
  
    // validate form
    if (nameEl.value === "" || amountEl.value === "") {
      errorEl.textContent = "Missing Information";
      return;
    }
    else {
      errorEl.textContent = "";
    }
  
    // create record
    let transaction = {
      name: nameEl.value,
      value: amountEl.value,
      date: new Date().toISOString()
    };
  
    // if subtracting funds, convert amount to negative number
    if (!isAdding) {
      transaction.value *= -1;
    }
  
    // add to beginning of current array of data
    transactions.unshift(transaction);
  
    // re-run logic to populate ui with new record
    populateChart();
    populateTable();
    populateTotal();
    
    // also send to server
    fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
    .then(response => {    
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      }
      else {
        // clear form
        nameEl.value = "";
        amountEl.value = "";
      }
    })
    .catch(err => {
      // fetch failed, so save in indexed db
      useIndexedDB("budgetDB","trasactStore", "add", transaction);
  
      // clear form
      nameEl.value = "";
      amountEl.value = "";
    });
  }