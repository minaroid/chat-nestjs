import * as dotenv from 'dotenv';

dotenv.config();

export class Environments {
  public static DB_URL = process.env.DB_URL ?? '';
  public static TOKEN_SECRET = process.env.TOKEN_SECRET ?? '';
  public static TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN ?? '';
}
