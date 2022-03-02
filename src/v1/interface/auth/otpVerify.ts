type OtpVerifyBody = {
  otp: string;
  otpType: string;
  destination: string;
};

export default OtpVerifyBody;
