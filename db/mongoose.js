import mongoose from "mongoose";
import "../config/env";

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log("MongoDB connect successful")).catch(err => console.log(err));

mongoose.set("debug", true);

export default mongoose;