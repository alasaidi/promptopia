import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
//get the post
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to Fetch Prompt", { status: 500 });
  }
};
//edit the Post
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (err) {
    return new Response("Failed to update Prompt", { status: 500 });
  }
};
//Delete the post
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompts Deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete Prompt", { status: 500 });
  }
};
