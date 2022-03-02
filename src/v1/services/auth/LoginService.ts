/* eslint-disable @typescript-eslint/no-explicit-any */
import PasswordHelper from '../../helpers/passwordHelper';
import LoginBody from '../../interface/auth/login';
import User from '../../model/User';
import * as JWT from 'jsonwebtoken';
// import path = require('path');
// import * as fs from 'fs';

class LoginService {
  /**
   * login
   */
  public async login(body: LoginBody) {
    try {
      const passwordHelper = new PasswordHelper();

      const user: any = await User.query().findOne({
        email: body.email,
      });

      if (!user) {
        return {
          success: false,
          message: 'Invalid email and password combination',
        };
      }

      const isPassword = await passwordHelper.compare(
        body.password,
        user.password
      );

      if (!isPassword) {
        if (user.attempts >= 3) {
          await User.query()
            .findOne({
              email: body.email,
            })
            .update({
              is_banned: true,
              banned_at: new Date(),
            });

          // update ban table

          return {
            success: false,
            message: `You have been banned for multiple login attempts, please contact support for help`,
          };
        }

        const agt: any = await User.query()
          .findOne({
            email: body.email,
          })
          .updateAndFetch({
            attempts: user.attempts + 1,
          });
        return {
          success: false,
          message: `Invalid email and password combination, you have ${
            3 - parseInt(agt.attempts)
          } attempts remaining `,
        };
      }

      await User.query()
        .findOne({
          email: body.email,
        })
        .update({
          attempts: 0,
        });

      const token = this.generateJWT(user.userData());

      return {
        success: true,
        message: '',
        data: {
          token,
          user: user.userData(),
        },
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: 'User failed to login',
      };
    }
  }

  /**
   * generateJWT
   */
  public generateJWT(user: any) {
    console.log(user);

    const privateKey = JSON.parse(process.env.PRIVATE_KEY || '');

    const token = JWT.sign(
      { id: user.id, created_at: new Date(), refresh: true },
      privateKey,
      {
        algorithm: 'RS256',
      }
    );

    return token;
  }
}

export default LoginService;
