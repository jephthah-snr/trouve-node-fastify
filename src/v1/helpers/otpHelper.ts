class OtpHelper {
  /**
   * compare otp  code
   */
  public async compare(code: string, otp: string) {
    const validated = otp === code
    return validated;
  }

  /**
   * generateOtp
   */
  public generateOtp() {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4 ; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

}

export default OtpHelper;