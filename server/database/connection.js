const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        // připojení k MongoDB
        const con = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

        console.log(`MongoDB je připojena: ${con.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB