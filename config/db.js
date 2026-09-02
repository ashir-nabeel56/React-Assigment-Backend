const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable not set!");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MONGODB CONNECTED SUCCESSFULLY");
        // return conn;
    } catch (error) {
        console.error("❌ MONGODB CONNECTION ERROR:", error.message);
        
    }
};

module.exports = connectDB;