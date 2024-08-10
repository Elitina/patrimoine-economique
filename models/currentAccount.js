class CurrentAccount {
  constructor(salary, currentAccount, expenses, accountOpeningdate) {
    this.salary = salary;
    this.currentAccount = currentAccount;
    this.expenses = expenses;
    this.accountOpeningdate = accountOpeningdate
  }
  currentAccountState(checkingDate) {
    let yearsPassed = (checkingDate.getFullYear() - this.accountOpeningdate.getFullYear()) * 12
    let monthsPassed = checkingDate.getMonth() + yearsPassed
    this.currentAccount += ((this.salary - this.expenses) * monthsPassed)
    let theDay = checkingDate.getDate()

    if (theDay == 30) {
      this.currentAccount += this.salary
    }
    else {
      this.currentAccount -= this.expenses
    }
    return this.currentAccount
  }
}
