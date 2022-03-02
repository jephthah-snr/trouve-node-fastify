import * as bcrypt from 'bcrypt';

const SALT_ROUNDS: string = process.env.SALT_ROUNDS || "12";

class PasswordHelper {

  /**
   * compare
   */
  public async compare(plainPassword: string, hashPassword: string) {
    try {
      const validated = await bcrypt.compare(plainPassword, hashPassword);
      return validated;
    } catch (error) {
      return false;
    }
  }

  /**
   * hashPassword
   */
  public async hashPassword(plainPassword: string) {
    const passwordHash = await bcrypt.hash(
      plainPassword,
      parseInt(SALT_ROUNDS)
    );

    return passwordHash;
  }
}

export default PasswordHelper;
