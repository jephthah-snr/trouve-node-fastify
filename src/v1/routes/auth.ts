import { FastifyPluginAsync } from "fastify";
import routePrefix from "../../configurations/routePrefix";
import SignupController from "../controllers/auth/SignupController";
import LoginController from "../../v1/controllers/auth/LoginController";
// import authMiddleware from "../../v1/middlewares/authMiddleware";

const authRoot: FastifyPluginAsync = async (fastify): Promise<void> => {
  const loginController = new LoginController();
  const signupController = new SignupController();

  // fastify.route({
  //   method: "POST",
  //   url: `${routePrefix.authRouteV1}/resetPassword`,
  //   preHandler: [authMiddleware],
  //   handler: resetPasswordController.resetPassword,
  // });

  fastify.route({
    method: "POST",
    url: `${routePrefix.authRouteV1}/signup`,
    // preHandler: [developer],
    handler: signupController.signup,
  });

  fastify.route({
    method: "POST",
    url: `${routePrefix.authRouteV1}/login`,
    // preHandler: [developer],
    handler: loginController.login,
  });

  fastify.route({
    method: "POST",
    url: `${routePrefix.authRouteV1}/pre-register`,
    // preHandler: [developer],
    handler: signupController.preRegister,
  });

  fastify.route({
    method: "GET",
    url: "/",
    handler: (req, reply) => {
      reply.status(200).send({
        status: true,
        message: "Trouve platform is running",
        data: {
          api: "Trouve API",
          version: "1.0.0",
        },
      });
    },
  });
};

export default authRoot;
