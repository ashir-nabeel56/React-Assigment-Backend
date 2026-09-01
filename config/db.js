const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MONGODB CONNECTED SUCCESSFULLY");
        // console.log(`Connected to: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("❌ MONGODB CONNECTION ERROR:", error.message);
        // process.exit(1);
    }
};

module.exports = connectDB;