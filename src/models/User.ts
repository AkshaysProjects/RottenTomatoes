import { Model, Schema, model, models } from "mongoose";
import type { AdapterUser } from "next-auth/adapters";

// Create a custom user interface by extending the AdapterUser interface
interface User extends AdapterUser {
  shortlist: string[];
}

// Define the schema
const UserSchema = new Schema<User>({
  name: String,
  email: { type: String, unique: true, required: true },
  emailVerified: Date,
  image: String,
  shortlist: [{ type: Schema.Types.ObjectId, ref: "Media" }],
});

// Define the model
const registeredModel: Model<User> = models.User;
export default registeredModel || model<User>("User", UserSchema);
