import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter'

// an object to hold all the providers
export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        TwitterProvider({
            clientId:process.env.TWITTER_CLIENT_ID,
            clientSecret:process.env.TWITTER_CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session,user}) {
            // session.tok = '67321774ygrgg42';

            return session
        }
    }
}

export default NextAuth(authOptions);