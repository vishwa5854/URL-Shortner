const mongoose = require('mongoose');
const configValues = require("../config/constants");

let init = async () => {
    let url = configValues.dbURL;

    try {
        await mongoose.connect(url);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Connection error: " + error);
    }
}

module.exports = init;
