const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    worth: { type: Number, required: true },
    stockData: [
        {
            name: { type: String },
            quantity: { type: Number },
            purchaseValue: { type: Number },
        }
    ]

});

const User = mongoose.model("User", userSchema);

module.exports = User;
