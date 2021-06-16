const mongoose = require("mongoose");

const db = require("../config/db.json");

mongoose.connect(db.connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = mongoose;
