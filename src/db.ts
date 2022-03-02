import knex from "knex";
import configs from "./knexfile";
import * as dotenv from "dotenv";
dotenv.config();
const db = knex(configs.development);

export default db;
