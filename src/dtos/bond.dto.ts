type TConstructorArgs = {
  id: string;
  name: string;
  quantity: number;
  faceValue: number;
  purchasePrice: number;
  paymentsPerYear: number;
  couponAmount: number;
  couponRate: number;
  currentYield: number;
  yieldToMaturity: number;
  maturityDate: string;
  total: number;
};

export default class BondDto {
  public readonly id: string;
  public readonly name: string;
  public readonly quantity: number;
  public readonly faceValue: number;
  public readonly purchasePrice: number;
  public readonly paymentsPerYear: number;
  public readonly couponAmount: number;
  public readonly couponRate: number;
  public readonly currentYield: number;
  public readonly yieldToMaturity: number;
  public readonly maturityDate: string;
  public readonly total: number;

  constructor({
    id,
    name,
    quantity,
    faceValue,
    purchasePrice,
    paymentsPerYear,
    couponAmount,
    couponRate,
    currentYield,
    yieldToMaturity,
    maturityDate,
    total,
  }: TConstructorArgs) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.faceValue = faceValue;
    this.purchasePrice = purchasePrice;
    this.paymentsPerYear = paymentsPerYear;
    this.couponAmount = couponAmount;
    this.couponRate = couponRate;
    this.currentYield = currentYield;
    this.yieldToMaturity = yieldToMaturity;
    this.maturityDate = maturityDate;
    this.total = total;
  }
}
