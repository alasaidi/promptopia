import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter player name"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exist!"],
    trim: [true, "Email is required"],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },
  image: {
    type: String,
  },
});
const User = models.User || model("User", UserSchema);

export default User;
