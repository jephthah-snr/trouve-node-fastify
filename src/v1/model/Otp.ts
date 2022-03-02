/* eslint-disable camelcase */
import { Model } from "objection";

export default class Otp extends Model {
  // Table name is the only required property.
  static tableName = "otp";

  destination!: string;
  otp_type!: string;
  code!: string;
  status!: string;
}
