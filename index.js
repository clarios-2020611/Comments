import { config } from "dotenv";
import { initServer } from "./configs/app.js";
import { connect } from "./configs/mongo.js";

config();
initServer();
connect();