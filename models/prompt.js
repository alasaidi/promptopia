import { models, model, Schema } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    require: [true, "Prompt is Required."],
  },
  tag: {
    type: [String],
    require: [true, "Tag is Required."],
  },
});
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
