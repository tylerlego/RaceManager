import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {} as any;

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.car = require("./car.model");
db.carClass = require("./car-class.model");
db.raceEvent = require("./race-event.model");
db.raceRegistration = require("./race-registration.model");

db.ROLES = ["user", "admin", "staff"];

module.exports = db;