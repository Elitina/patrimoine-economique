class SavingsAccount {
  constructor(seedFunding, interestRate, accountOpeningdate) {
    this.seedFunding = seedFunding;
    this.interestRate = interestRate / 100
    this.accountOpeningdate = accountOpeningdate
  }

  savingsAccountwithInterest(checkingDate){
    let interestPerDay = this.interestRate / 36500
    let timeDiff = Math.abs(checkingDate.getTime() - this.acquisitionDate.getTime());
    let interestValue = timeDiff * interestPerDay * this.value
    let newValue = this.value + interestValue
    return newValue
  }
}
