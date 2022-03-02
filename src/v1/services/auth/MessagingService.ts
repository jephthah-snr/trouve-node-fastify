/* eslint-disable @typescript-eslint/no-explicit-any */
class MessagingService {
  /**
   * sendEmail
   */
  public async sendEmail(body: any) {
    try {
      console.log(body);

      const sendEmail = {
        success: true,
      };

      if (!sendEmail.success) {
        return {
          success: false,
          message: "Email failed to send, please try again in a few minutes",
        };
      }

      return {
        success: true,
        message: "Email sent successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Email failed to send, please try again in a few minutes",
      };
    }
  }
}

export default MessagingService;
