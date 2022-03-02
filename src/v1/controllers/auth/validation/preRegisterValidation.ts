/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";

export default async (body: { email: string }) => {
  try {
    const preRegisterSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
        "string.base": "Email should be a type of 'text'",
        "string.empty": "Email cannot be empty",
        "string.email": "This is not a valid email",
        "any.required": "Email is required",
      }),
    });

    const data = await preRegisterSchema.validateAsync(body, { abortEarly: false });

    if (data.error) {
      return {
        success: false,
        message: data.error.details[0].message,
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
      errors: errors,
      data: {},
    };
  }
};
