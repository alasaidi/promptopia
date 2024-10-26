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
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({
          email: session.user.email,
        });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (err) {
        console.log("Error in session callback: ", err.message);
        return session;
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        //check if a user already exists
        const userExist = await User.findOne({
          email: profile.email,
        });

        //if not, create a new user
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log("Error checking if user exists: ", err.message);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
