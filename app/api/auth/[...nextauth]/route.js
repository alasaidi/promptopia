import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDB();

      //check if a user already exists
      const userExist = await User.findOne({
        email: profile.email,
      });

      //if not, create a new user
      if (!userExist) {
        await User.create({
          name: profile.name.replace("", "").toLowerCase(),
          email: profile.email,
          image: profile.picture,
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
});
export { handler as GET, handler as POST };
