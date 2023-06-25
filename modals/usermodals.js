import mongoose from "mongoose";

import { Schema } from "mongoose";

const userdata = new Schema
({
    name:String,
    email:String,
    password:String,
    access_token:String
})

export default mongoose.model("userdatas",userdata)