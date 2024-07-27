class Possession {
  constructor(owner, acquisitionDate, lossDate, value, depreciation) {
    this.owner = owner;
    this.acquisitionDate = acquisitionDate;
    this.lossDate = lossDate;
    this.value = value;
    this.depreciation = depreciation;
  }

  valueAfterDepreciation(checkingDate){
    let depreciationPerDay = this.depreciation / 36500
    let timeDiff = Math.abs(checkingDate.getTime() - this.acquisitionDate.getTime());
    let depreciationValue = timeDiff * depreciationPerDay * this.value
    let newValue = this.value - depreciationValue
    return newValue
  }
}
