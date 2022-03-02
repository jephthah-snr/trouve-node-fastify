/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import preRegisterValidation from "./validation/preRegisterValidation";
// import SignupBody from "@module/v1/interface/auth/signup";
import SignupService from "../../services/auth/SignupService";
import signupValidation from "./validation/signupValidation";
import LoginService from "../../services/auth/LoginService";

const signupService = new SignupService();
class RegisterController {
  public async signup(req: FastifyRequest<{ Body: any }>, res: FastifyReply) {
    const loginService = new LoginService();

    try {
      // validate user input
      const validateUser: any = await signupValidation(req.body);

      if (!validateUser.success) {
        return res.status(400).send({
          status: false,
          message: validateUser.message,
        });
      }

      const signupUser: any = await signupService.signup(validateUser.data);

      if (!signupUser.success) {
        return res.status(400).send({
          status: false,
          message: signupUser.message,
        });
      }

      const signinPayload = {
        password: signupUser.data.plainPassword,
        email: validateUser.data.email,
      };

      const loginUser = await loginService.login(signinPayload);

      if (!loginUser.success) {
        return res.status(400).send({
          status: false,
          message: loginUser.message,
        });
      }

      const { data: loginData } = loginUser;

      // // return response
      return res.status(200).send({
        status: true,
        message: "User signup successfully",
        data: {
          token: loginData?.token,
          user: loginData?.user,
        },
      });
    } catch (error) {
      console.log(error);

      return res.status(400).send({
        status: true,
        message: "Failed to login, server error, please try again in a few minutes.",
      });
    }
  }

  /**
   * preRegister
   */
  public async preRegister(req: FastifyRequest<{ Body: { email: string } }>, res: FastifyReply) {
    try {
      const validateData = await preRegisterValidation(req.body);

      if (!validateData.success) {
        return res.status(400).send({
          success: false,
          message: validateData.message,
          errors: validateData.errors,
        });
      }

      const preReg = await signupService.preRegister(validateData.data);

      if (!preReg.success) {
        return res.status(400).send({
          success: false,
          message: preReg.message,
        });
      }

      return res.status(200).send({
        success: true,
        data: {
          otp: preReg.otp,
        },
        message: `Check your email (${req.body.email}) inbox/spam for OTP to verify this email`,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Failed to send otp to email, please try again later",
      });
    }
  }
}

export default RegisterController;
