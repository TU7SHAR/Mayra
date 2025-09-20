// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import Email from "next-auth/providers/email";
import { Resend } from "resend"; // Import the Resend SDK directly

// Initialize the Resend client with your API key
const resend = new Resend(process.env.AUTH_RESEND_KEY);

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Email({
      from: "Myara Organics <onboarding@resend.dev>", // This is what the user will see

      // This function tells NextAuth exactly how to send the email using Resend
      sendVerificationRequest: async ({ identifier: email, url }) => {
        try {
          const { data, error } = await resend.emails.send({
            from: "Myara Organics <onboarding@resend.dev>",
            to: email,
            subject: "Sign in to Myara Organics",
            html: `
              <p>Hi there,</p>
              <p>Click the link below to sign in to your account.</p>
              <a href="${url}"><strong>Sign In</strong></a>
              <p>If you did not request this email, you can safely ignore it.</p>
            `,
          });

          if (error) {
            console.error({ error });
            throw new Error("Failed to send verification email.");
          }
        } catch (error) {
          console.error("Failed to send verification email:", error);
          throw new Error("Failed to send verification email.");
        }
      },
    }),
  ],
});

export const { GET, POST } = handlers;
