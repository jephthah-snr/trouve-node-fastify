/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import SignupBody from './../../../interface/auth/signup';

export default async (body: SignupBody) => {
  try {
    const signupSchema = Joi.object().keys({
      full_name: Joi.string().required(),
      email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required',
      }),
      user_type: Joi.string()
        .required()
        .messages({
          'string.empty': 'user_type cannot be empty',
          'any.required': 'user_type is required',
        })
        .valid(...Object.values(['DEVELOPER', 'USER'])),

      password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
        .required()
        .messages({
          'string.base': "password should be a type of 'text'",
          'string.empty': 'password cannot be empty',
          'string.min': 'password must be minimum of 8 characters',
          'string.pattern.base':
            'this is not a valid password, password must be minimum eight characters, at least one upper,lower case letter and one number',
          'any.required': 'password is required',
        }),
      otp: Joi.string().length(4).required().messages({
        'string.base': "Otp should be a type of 'text'",
        'string.empty': 'Otp cannot be empty',
        'string.length': 'Otp must be of length 4',
        'any.required': 'Otp is required',
      }),
    });

    const data = await signupSchema.validateAsync(body, { abortEarly: false });

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
    const errors = error.message.split('.');
    return {
      success: false,
      message: errors[0],
      errors: errors,
      data: {},
    };
  }
};
