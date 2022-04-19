import { connect } from "mongoose";

export async function run() {
  //Connect to MongoDB
  await connect("mongodb://localhost:27017/test");
}
