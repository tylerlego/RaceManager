import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {} as any;

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "staff"];

module.exports = db;