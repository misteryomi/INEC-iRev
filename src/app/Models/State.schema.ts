import mongoose from "mongoose";

const { Schema } = mongoose;


const StateSchema = new Schema();

export default mongoose.model('State', StateSchema);