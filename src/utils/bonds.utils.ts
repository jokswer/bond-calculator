type TGetCouponRateArgs = {
  couponAmount?: number;
  paymentsPerYear: number;
  faceValue: number;
};

type TGetCurrentYieldArgs = {
  couponAmount?: number;
  paymentsPerYear: number;
  purchasePrice: number;
};

type TGetYieldToMaturityArgs = {
  purchasePrice: number;
  faceValue: number;
};

type TGetTotalArgs = {
  quantity: number;
  faceValue: number;
};

export const getCouponRate = ({
  couponAmount,
  paymentsPerYear,
  faceValue,
}: TGetCouponRateArgs) => {
  if (!couponAmount || !paymentsPerYear || !faceValue) return null;
  return (couponAmount * paymentsPerYear) / faceValue;
};

export const getCurrentYield = ({
  couponAmount,
  paymentsPerYear,
  purchasePrice,
}: TGetCurrentYieldArgs) => {
  if (!couponAmount || !paymentsPerYear || !purchasePrice) return null;
  return (couponAmount * paymentsPerYear) / purchasePrice;
};

export const getYieldToMaturity = ({
  faceValue,
  purchasePrice,
}: TGetYieldToMaturityArgs) => {
  if (!faceValue || !purchasePrice) return null;
  return (faceValue - purchasePrice) / purchasePrice;
};

export const getTotal = ({ quantity, faceValue }: TGetTotalArgs) => {
  if (!quantity || !faceValue) return null;
  return quantity * faceValue;
};
