/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import OtpVerifyBody from "./../../../../v1/interface/auth/otpVerify";

export default async (body: OtpVerifyBody) => {
  try {
    const otpVerifySchema = Joi.object({
      otp: Joi.number().required().messages({
        "number.empty": "Otp cannot be empty",
        "any.required": "Otp is required",
      }),
      otpType: Joi.string(),
      destination: Joi.string()
    });

    const data = await otpVerifySchema.validateAsync(body);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    const errors = error.message.split(".");
    return {
      success: false,
      message: errors[0],
      status: 400,
      data: errors,
    };
  }
};
