/* eslint-disable @typescript-eslint/no-explicit-any */
import PasswordHelper from '../../helpers/passwordHelper';
import SignupBody from '../../../v1/interface/auth/signup';
import User from '../../model/User';
import * as crypto from 'crypto';
import Logger from '../../helpers/Logger';
import OtpService from './OtpService';
import OtpType from '../../../v1/types/otpType';
import OtpVerifyBody from '../../../v1/interface/auth/otpVerify';
import USERTYPE from '../../../v1/enum/userType';

const logger: Logger = new Logger('[SignUp Service]');
const otpService: OtpService = new OtpService();
const TROUVE_NOREPLY_EMAIL_FROM =
  process.env.TROUVE_NOREPLY_EMAIL_FROM || '';
class SignupService {
  /**
   * signup
   */
  public async signup(body: SignupBody) {
    try {
      const passwordHelper = new PasswordHelper();

      const user: any = await User.query().findOne({
        email: body.email,
      });

      if (user) {
        return {
          success: false,
          message:
            'An user with this email address already exist, please log in to continue.',
        };
      }

      const verifyBody: OtpVerifyBody = {
        otp: body.otp,
        otpType: OtpType.VerifyEmail,
        destination: body.email,
      };
      const verifyOtp = await otpService.otpVerify(verifyBody);

      console.log(verifyOtp);

      if (!verifyOtp.success) {
        return {
          success: false,
          message: 'The otp you entered is either invalid or expired.',
        };
      }

      const plainPassword = body.password;

      const hashedPassword = await passwordHelper.hashPassword(body.password);
      body.password = hashedPassword;
      body.user_type = USERTYPE.USER;

      const userCode = crypto
        .createHmac('sha256', body.email)
        .update(body.full_name)
        .digest('hex')
        .substring(0, 6);

      const created = await this.createUser({ ...body, user_code: userCode });

      if (!created.success) {
        return {
          success: false,
          message: created.message,
          data: null,
        };
      }

      return {
        success: true,
        data: {
          user: created.data,
          plainPassword,
        },
      };
    } catch (error: any) {
      console.log('<<<>>>>>>>', error);

      logger.error(error.message);
      return {
        success: false,
        message:
          'user registration failed, please try again in a few minutes !!!',
      };
    }
  }

  /**
   * createUser
   */
  async createUser(body: any) {
    try {
      delete body.otp;
      let user: any = '';

      const Atrx = await User.startTransaction();

      try {
        // If you created the transaction using `Model.startTransaction`, you need
        // commit or rollback the transaction manually.

        user = await User.query().insert(body);

        await Atrx.commit();
      } catch (error: any) {
        console.log(error);

        logger.error(error.message);
        await Atrx.rollback();
        throw error;
      }

      return {
        success: true,
        data: user.userData(),
      };
    } catch (error: any) {
      logger.error(error.message);
      return {
        success: false,
        message:
          'User registration failed, please try again in a few minutes !!!',
      };
    }
  }

  async preRegister(data: { email: string }) {
    try {
      const user = await User.query().findOne({
        email: data.email,
      });

      if (user) {
        return {
          success: false,
          message:
            'This email is already assigned to an user, please login to continue.',
          otp: null,
        };
      }

      // send email otp
      const otpdata = {};
      const sendOtp = await otpService.sendOtp(
        otpdata,
        data.email,
        TROUVE_NOREPLY_EMAIL_FROM,
        OtpType.VerifyEmail
      );

      return sendOtp;
    } catch (error: any) {
      console.log(error);

      logger.error(error.message);
      throw error;
    }
  }
}

export default SignupService;
