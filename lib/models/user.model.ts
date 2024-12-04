import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkID: { type: String, required: true, unique: true },
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  userImage: { type: String, required: true },
});

const User = models?.User || model("User", UserSchema);

export default User;
