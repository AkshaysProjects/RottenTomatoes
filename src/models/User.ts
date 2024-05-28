import { Model, Schema, Types, model, models } from "mongoose";
import type { AdapterUser } from "next-auth/adapters";

// Create a custom user interface by extending the AdapterUser interface
export interface IUser extends AdapterUser {
  shortlist: Types.ObjectId[];
}

export interface TUser extends IUser {
  _id: Types.ObjectId;
}

// Define the schema
const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true, required: true },
  emailVerified: Date,
  image: String,
  shortlist: [{ type: Schema.Types.ObjectId, ref: "Media" }],
});

// Define the model
const registeredModel: Model<IUser> = models.User;
export default registeredModel || model<IUser>("User", UserSchema);
