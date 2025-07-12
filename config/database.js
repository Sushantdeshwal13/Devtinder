const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://sushantdeshwal12:812v0SE3PtK5DXqR@clusterdev.rymsj1n.mongodb.net/devtinder?retryWrites=true&w=majority&appName=ClusterDev"
    )
};

module.exports = connectDB;