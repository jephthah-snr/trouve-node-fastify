import { FastifyReply } from 'fastify';
import * as jwt from 'jsonwebtoken';
// import * as fs from "fs";
// import { join } from "path";
import User from './../model/User';

const authMiddleware = async (req: any, res: FastifyReply) => {
  try {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send({
        status: false,
        data: {},
        message: 'no authorization header found',
      });
    }

    const authorization = req.headers.authorization.split(' ');

    const jwtToken = authorization[1];

    console.log(jwtToken);

    const jwtSecret = JSON.parse(process.env.PRIVATE_KEY || '');
    console.log('jwtSecret', jwtSecret);

    // check if token is in redis

    const isJwtValid: any = jwt.verify(jwtToken, jwtSecret);

    if (!isJwtValid) {
      return res.status(401).send({
        status: false,
        message: 'Unauthorized user, please login to continue',
      });
    }

    const user = await User.query().findById(isJwtValid.id);

    if (!user) {
      console.log('This is not a user');

      return res.status(401).send({
        status: false,
        message: 'Unauthorized user, please login to continue',
      });
    }
    req.user = user.userData();
  } catch (error: any) {
    console.log('Auth middleware Failed::', error.message);

    return res.status(401).send({
      status: false,
      data: {},
      message: 'Failed to authorize user, please login to continue',
    });
  }
};

export default authMiddleware;
