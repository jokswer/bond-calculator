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
  const result = (couponAmount * paymentsPerYear) / faceValue;
  return (result * 100).toFixed(2);
};

export const getCurrentYield = ({
  couponAmount,
  paymentsPerYear,
  purchasePrice,
}: TGetCurrentYieldArgs) => {
  if (!couponAmount || !paymentsPerYear || !purchasePrice) return null;
  const result = (couponAmount * paymentsPerYear) / purchasePrice;
  return (result * 100).toFixed(2);
};

export const getYieldToMaturity = ({
  faceValue,
  purchasePrice,
}: TGetYieldToMaturityArgs) => {
  if (!faceValue || !purchasePrice) return null;
  const result = (faceValue - purchasePrice) / faceValue;
  return (result * 100).toFixed(2);
};

export const getTotal = ({ quantity, faceValue }: TGetTotalArgs) => {
  if (!quantity || !faceValue) return null;
  return quantity * faceValue;
};
