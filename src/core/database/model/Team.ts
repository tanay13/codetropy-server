import { Schema, model, connect } from "mongoose";
import { ITeam } from "../../../interface";

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
});

export const Team = model<ITeam>("Team", TeamSchema);
