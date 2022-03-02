/* eslint-disable camelcase */
import USERTYPE from "../enum/userType";
import { Model } from "objection";

export default class User extends Model {
  // Table name is the only required property.
  static tableName = "users";

  id!: number;
  full_name!: string;
  email!: string;
  is_banned!: boolean;
  password!: string;
  phone: string | undefined;
  user_type!: USERTYPE;
  user_code!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date | null;

  attempts?: number;
  banned_at?: Date;
  dob?: string;
  gender?: string;
  country?: string;

  userData() {
    return {
      id: this.id,
      full_name: this.full_name,
      email: this.email,
      is_banned: this.is_banned,
      phone: this.phone,
      user_type: this.user_type,
      user_code: this.user_code,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      attempts: this.attempts,
      banned_at: this.banned_at,
      gender: this.gender,
      country: this.country,
    };
  }
}
