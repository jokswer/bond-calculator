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

    const bondDto = new BondDto({ id: bond._id.toString(), ...bond });

    return { ...bondDto };
  };
}

export default BondsRepository;
