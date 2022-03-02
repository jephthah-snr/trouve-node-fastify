/* eslint-disable camelcase */
import { FastifyReply } from "fastify";

const bannedMiddleware = async (req: any, res: FastifyReply) => {
  try {
    const { is_banned, banned_at } = req.user;

    if (is_banned || !banned_at) {
      return res.status(400).send({
        success: false,
        data: {},
        message: "Banned!!, Can't perform operation, contact our support",
      });
    }
  } catch (error: any) {
    console.log("Banned middleware Failed::", error.message);

    return res.status(400).send({
      status: false,
      data: {},
      message: "Failed  user, please login to continue",
    });
  }
};

export default bannedMiddleware;
