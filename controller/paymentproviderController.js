import PaymentProvider from "../model/paymentProviderModel.js";
import Provider from "../model/providerModel.js";

import mongoose from "mongoose";

export const dopayment = async (req, res) => {
  try {
    const { providerId } = req.params;

    // Check if the providerId exists in the PaymentProvider model
    let existingPayment = await PaymentProvider.findOne({ providerId });

    if (!existingPayment) {
      // If the providerId doesn't exist, create a new payment record
      existingPayment = await PaymentProvider.create({ providerId });
    }

    // Check if payment is already done
    if (existingPayment.payment === "done") {
      return res.status(400).json({
        message: "Payment already done",
      });
    }

    // Update payment status to "done"
    existingPayment.payment = "done";
    await existingPayment.save();

    res.status(200).json({
      // message: "Payment successfully updated",
      payment: existingPayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const checkpaymentstatus = async (req, res) => {
  try {
    const { providerId } = req.params;

    // Check if the providerId exists in the PaymentProvider model
    let existingPayment = await PaymentProvider.findOne({ providerId });

    if (!existingPayment) {
      res.json("not done");
    } else if (existingPayment.payment === "done") {
      res.json("done");
    } else {
      res.json("not done");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const dopaymentplan = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { plan, timePeriod } = req.body;

    // Check if the providerId exists in the PaymentProvider model
    let existingPayment = await PaymentProvider.findOne({ providerId });

    if (!existingPayment) {
      // If the providerId doesn't exist, create a new payment record
      existingPayment = await PaymentProvider.create({ providerId });
    }

    // Check if payment is already done
    if (existingPayment.payment === "done") {
      return res.status(400).json({
        message: "Payment already done",
      });
    }

    // Update payment status to "done"
    existingPayment.payment = "done";
    existingPayment.plan = plan;
    existingPayment.timePeriod = timePeriod;
    await existingPayment.save();

    res.status(200).json({
      // message: "Payment successfully updated",
      payment: existingPayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const givepaymentinfo = async (req, res) => {
  try {
    const { providerId } = req.params;

    // Check if the providerId exists in the PaymentProvider model
    let existingPayment = await PaymentProvider.findOne({ providerId });

    if (!existingPayment) {
      res.json("not done");
    } else if (existingPayment.payment === "done") {
      res.json({
        payment: "done",
        plan: existingPayment.plan,
        timePeriod: existingPayment.timePeriod,
        created: existingPayment.created,
      });
    } else {
      res.json("not done");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
