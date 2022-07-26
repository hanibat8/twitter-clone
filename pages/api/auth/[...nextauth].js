import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import * as firestorefunctions from 'firebase/firestore';
import { db } from "../../../firebase.config"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirebaseAdapter({
    db:db,
    ...firestorefunctions
  }),
  callbacks: {
    async session({ session, token, user }) {
      console.log(user.id)
      // Send properties to the client, like an access_token from a provider.
      session.userId = user.id;
      console.log(session.userId) 
      return session
    }
  }
})