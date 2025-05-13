import { BondDto } from "../dtos/index.ts";
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

  public getUserBondById = async (userId: string, bondId: string) => {
    const bond = await bondModel.findOne({ userId, _id: bondId }).exec();

    if (!bond) {
      return null;
    }

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

  public getAllUserBonds = async (userId: string) => {
    const bonds = await bondModel.find({ userId }).exec();
    return bonds.map((bond) => ({
      ...new BondDto({
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
      }),
    }));
  };

  public deleteBondById = async (userId: string, bondId: string) => {
    const bond = await bondModel
      .findOneAndDelete({ userId, _id: bondId })
      .exec();

    if (!bond) {
      return null;
    }

    return bond;
  };

  public editBondById = async (
    userId: string,
    bondId: string,
    bondData: TBondData
  ) => {
    const bond = await bondModel.findOneAndUpdate(
      { userId, _id: bondId },
      {
        ...bondData,
        userId,
        couponRate: getCouponRate(bondData),
        currentYield: getCurrentYield(bondData),
        yieldToMaturity: getYieldToMaturity(bondData),
        total: getTotal(bondData),
      },
      { new: true }
    );

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
