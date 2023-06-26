"use strict"
console.log("website under work");

const container = document.getElementById("container");
const storeTable = document.getElementById("store-table");
const newStoreForm = document.getElementById("new-store-form");

const hours = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

function randomNum(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}

const allStores = []


function Cookiestand(storeName, minCustPerHour, maxCustPerHour, avgCookiesPerHour) {
    this.storeName = storeName;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.avgCookiesPerHour = avgCookiesPerHour;
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalDailyCookies = 0;
    allStores.push(this);
    this.render();
  }

Cookiestand.prototype.calcCustomersEachHour = function () {
    for (let i = 0; i < hours.length; i++) {
      this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour));
    }
    console.log(this.customersEachHour);
  };

  Cookiestand.prototype.calcCookiesEachHour = function () {
    for (let i = 0; i < hours.length; i++) {
      const oneHour = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerHour);
      this.cookiesEachHour.push(oneHour);
      this.totalDailyCookies += oneHour;
    }
  };

  Cookiestand.prototype.pushStore = function () {
    allStores.push(this);
  };

Cookiestand.prototype.render = function () {
  this.calcCustomersEachHour();
  this.calcCookiesEachHour();

  // create a table row
  const tr = document.createElement("tr");

  // create a table data cell
  const th = document.createElement("th");
  th.textContent = this.storeName;

  // append the table data to the table row
  tr.appendChild(th);

  // loop through cookiesEachHour - create a td for each index and append to tr
  for (let i = 0; i < hours.length; i++) {
    const td = document.createElement("td");
    td.textContent = this.cookiesEachHour[i];
    tr.appendChild(td);
  }

  // create a th to display the totals and append to the tr
  const storeTotal = document.createElement("th");
  storeTotal.textContent = this.totalDailyCookies;
  tr.appendChild(storeTotal);

  // append the tr to the table - storeTable
  storeTable.appendChild(tr);
};

function hoursRow() {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = "Store Location";
  tr.appendChild(th);

  for (let i = 0; i < hours.length; i++) {
    const th = document.createElement("th");
    th.textContent = hours[i];
    tr.appendChild(th);
  }

  const storeTotalsHeaderCell = document.createElement("th");
  storeTotalsHeaderCell.textContent = "Store Totals";
  tr.appendChild(storeTotalsHeaderCell);
  storeTable.appendChild(tr);
}

hoursRow();

// test constructor works
const seattle = new Cookiestand("seattle", 23, 65, 6.3);
console.log(seattle);

const tokyo = new Cookiestand("tokyo", 3, 24, 1.2);

const dubai = new Cookiestand("dubai", 11, 38, 3.7);

const paris = new Cookiestand("paris", 20, 38, 2.3);

const lima = new Cookiestand("lima", 2, 16, 4.6);

function hourlyTotals() {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = "Hourly Totals";
  tr.appendChild(th);

  for (let i = 0; i < hours.length; i++) {
    const th = document.createElement("th");
    let hoursAdded = 0;
    for (let j = 0; j < allStores.length; j++) {
      const hourAmount = allStores[j].cookiesEachHour[i];
      hoursAdded += hourAmount;
    }
    th.textContent = hoursAdded;
    tr.appendChild(th);
  }

  let totalTotals = 0;
  for (let i = 0; i < allStores.length; i++) {
    totalTotals += allStores[i].totalDailyCookies;
  }

  const totalsCell = document.createElement("th");
  totalsCell.textContent = totalTotals;
  tr.appendChild(totalsCell);

  storeTable.appendChild(tr);
}
hourlyTotals();



newStoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  storeTable.innerHTML = "";
  hoursRow();

  for (let i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }

  const storeNameInput = event.target.storeName.value;
  const minCustInput = event.target.minCust.value;
  const maxCustInput = event.target.maxCust.value;
  const avgCookiesInput = event.target.avgCookies.value;

  const store = new Cookiestand(storeNameInput, minCustInput, maxCustInput, avgCookiesInput);

 
  newStoreForm.reset();
  hourlyTotals();
});


