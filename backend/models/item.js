import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({});

const Item = mongoose.model("Item", ItemSchema);

export default Item;
