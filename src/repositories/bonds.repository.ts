import BondDto from "../dtos/bond.dto.ts";
import { bondModel } from "../models/index.ts";
import {
  getCouponRate,
  getCurrentYield,
  getTotal,
  getYieldToMaturity,
} from "../utils/index.ts";

type TBondData = {
  name: string;
  quantity: number;
  faceValue: number;
  purchasePrice: number;
  paymentsPerYear: number;
  couponAmount?: number;
  maturityDate: Date;
};

class BondsRepository {
  public createBond = async (userId: string, bondData: TBondData) => {
    const bond = await bondModel.create({
      ...bondData,
      userId,
      couponRate: getCouponRate(bondData),
      currentYield: getCurrentYield(bondData),
      yieldToMaturity: getYieldToMaturity(bondData),
      total: getTotal(bondData),
    });

    const bondDto = new BondDto({
      id: bond._id.toString(),
      name: bond.name,
      quantity: bond.quantity,
      faceValue: bond.faceValue,
      purchasePrice: bond.purchasePrice,
      paymentsPerYear: bond.paymentsPerYear,
      couponAmount: bond.couponAmount,
      couponRate: bond.couponRate,
      currentYield: bond.currentYield,
      yieldToMaturity: bond.yieldToMaturity,
      maturityDate: bond.maturityDate.toISOString(),
      total: bond.total,
    });

    return { ...bondDto };
  };
}

export default BondsRepository;
