import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [/^(?=.{3,20}$)[a-zA-Z0-9]+$/, "Username invalid, it should contain 3-20 alphanumeric letters and be unique!"],
  },
  image: {
    type: String,
  },
});
const User = models.User || model("User", UserSchema);

export default User;
