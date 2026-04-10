const mongoose = require("mongoose");

require("dotenv").config();

const connectWithUri = async (uri) => {
    return mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        family: 4,
    });
};

module.exports.MongoDBconfig = async () => {
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL;
    const fallbackUrl = process.env.MONGODB_DIRECT_URL || process.env.MONGO_DIRECT_URL;

    if (!mongoUrl) {
        console.log("MongoDB Connection Error: MONGODB_URL/MONGO_URL is missing in backend/.env");
        return;
    }

    try {
        await connectWithUri(mongoUrl);
        console.log("connected to database successfully");
    } catch (err) {
        const isSrvDnsFailure =
            err?.code === "ECONNREFUSED" &&
            (err?.syscall === "querySrv" || String(err?.message || "").includes("querySrv"));

        if (!isSrvDnsFailure || !fallbackUrl) {
            console.log("MonogoDB Connection Error", err);
            return;
        }

        console.log("SRV DNS lookup failed. Retrying MongoDB with direct URI fallback...");

        try {
            await connectWithUri(fallbackUrl);
            console.log("connected to database successfully (direct URI fallback)");
        } catch (fallbackErr) {
            console.log("MonogoDB Connection Error", fallbackErr);
        }
    }
};
