/* eslint-disable @typescript-eslint/no-explicit-any */
import OtpHelper from "../../helpers/otpHelper";
import OtpVerifyBody from "../../../v1/interface/auth/otpVerify";
import Otp from "../../model/Otp";
import OtpType from "../../../v1/types/otpType";
import Logger from "../../helpers/Logger";
import MessagingService from "./MessagingService";
import message from "@v1/interface/message";

const otpHelper = new OtpHelper();
const logger: Logger = new Logger("[Otp Service]");
const messagingService: MessagingService = new MessagingService();
class OtpService {
  /**
   * otpVerify
   */
  public async otpVerify(body: OtpVerifyBody) {
    try {
      const otp: any = await Otp.query().findOne({
        code: body.otp,
        destination: body.destination,
        otp_type: body.otpType,
        status: "valid",
      });

      if (!otp) {
        return {
          status: false,
          message: "Invalid or expired otp token",
        };
      }

      //chek if otp is valid with time

      /**
       * Delete otp from database
       * */
      await Otp.query().delete().where({
        code: body.otp,
        destination: body.destination,
        otp_type: body.otpType,
      });

      return {
        success: true,
        message: "Otp is valid",
      };
    } catch (error) {
      return {
        success: false,
        message: "Otp verification Failed",
      };
    }
  }

  /**
   * sendOtp
   */
  public async sendOtp(data: object, email: string, from: string, type: OtpType) {
    try {
      const ResetOtp = otpHelper.generateOtp();

      await Otp.query().insert({
        destination: email,
        code: ResetOtp,
        otp_type: type,
        status: "valid",
      });

      const otp = ResetOtp;

      const body: message = {
        to: email,
        from,
        subject: "Please Verify your Email",
        templateName: "",
        data: { otp, ...data },
      };
      const sendMessage = await messagingService.sendEmail(body);

      // return sendMessage;

      return { ...sendMessage, otp };
    } catch (error: any) {
      logger.error(error.message);
      throw error;
    }
  }
}

export default OtpService;
