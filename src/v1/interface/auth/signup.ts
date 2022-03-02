import USERTYPE from "../../../v1/enum/userType";

/* eslint-disable camelcase */
type SignupBody = {
  full_name: string;
  password: string;
  email: string;
  otp: string;
  user_type?: USERTYPE;
};

export default SignupBody;
