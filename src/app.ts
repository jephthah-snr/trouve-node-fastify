import fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import database from "./knexfile";
import knex from "knex";
import authRoutes from "./v1/routes/auth";
import deliveryRoutes from "./v1/routes/delivery";
import { Model } from "objection";

import { Server, IncomingMessage, ServerResponse } from "http";
dotenv.config();

class App {
  public app: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  public app_domain = "0.0.0.0";
  public app_port = process.env.PORT || 3000;

  constructor() {
    this.app = fastify({ logger: true });
    App.database();
    this.app.register(authRoutes);
    this.app.register(deliveryRoutes);
    this.listen();
  }

  private static database() {
    Model.knex(knex(database.development));
  }

  public listen() {
    this.app.listen(this.app_port, "0.0.0.0", () => {
      // console.log(`App listening at port ${this.app_port} 🌟👻`);
    });
  }
}

export default App;
