/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Joi from "joi";
import LoginBody from "../../../interface/auth/login";

export default async (body: LoginBody) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
        "string.empty": "Email cannot be empty",
        "string.valid": "Email is not valid",
        "any.required": "Email is required",
      }),

      password: Joi.string().required().messages({
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      }),
    });

    const data = await loginSchema.validateAsync(body, { abortEarly: false });

    if (data.error) {
      return {
        success: false,
        message: data.error.details[0].message,
        status: 400,
        data: data.error,
      };
    }

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
