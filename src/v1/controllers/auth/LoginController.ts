/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import LoginBody from "./../../../v1/interface/auth/login";
import LoginService from "../../services/auth/LoginService";
import loginValidation from "../../controllers/auth/validation/loginValidation";

class LoginController {
  public async login(req: FastifyRequest<{ Body: LoginBody }>, res: FastifyReply) {
    const loginService = new LoginService();
    try {
      // validate user input
      const validateUser: any = await loginValidation(req.body);

      if (!validateUser.success) {
        return res.status(400).send({
          status: false,
          message: validateUser.message,
        });
      }

      //call user service to login user
      const loginUser = await loginService.login(validateUser.data);

      if (!loginUser.success) {
        return res.status(400).send({
          status: false,
          message: loginUser.message,
        });
      }

      const { data } = loginUser;

      // return response
      return res.status(200).send({
        status: true,
        message: "Welcome to your trouve dashboard",
        data: {
          token: data?.token,
          user: data?.user,
        },
      });
    } catch (error) {
      return res.status(400).send({
        status: true,
        message: "Failed to login, server error, please try again in a few minutes.",
      });
    }
  }
}

export default LoginController;

//test git
