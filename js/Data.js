export class DataStore {
  constructor() {
    //check if bills data in ls
    localStorage.getItem("bills") != null
      ? localStorage.getItem("bills")
      : this.buildData();
    this.storage = JSON.parse(localStorage.getItem("bills"));

    //validate bills from ls
    let validObj = true;
    let keys = ["income", "paydate", "bills"];
    keys.forEach(key => {
      validObj = this.storage[key] === undefined ? false : true;
    });
    if (validObj == false) {
      this.storage = this.buildData();
    }
  }

  buildData() {
    localStorage.setItem(
      "bills",
      JSON.stringify({
        income: "",
        paydate: "",
        bills: {}
      })
    );
    this.storage = JSON.parse(localStorage.getItem("bills"));
    return this.storage;
  }

  getData() {
    return this.storage;
  }

  saveData() {
    localStorage.setItem("bills", JSON.stringify(this.storage));
  }

  setIncome(income) {
    this.storage.income = income;
    this.saveData();
  }

  setPayDate(paydate) {
    this.storage.paydate = paydate;
    this.saveData();
  }

  setBill(billname, billAmount, billDueDate) {
    this.storage.bills[billname] = {};
    this.storage.bills[billname].amount = billAmount;
    this.storage.bills[billname].billDueDate = billDueDate;
    this.saveData();
  }

  removeBill(billname) {
    if (billname in this.storage.bills) {
      delete this.storage.bills[billname];
      this.saveData();
    }
  }
}
