import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.AUTH_DB_NAME);

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;  

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client
    }),
    user: {
        additionalFields: {
            role: {
                default: "reader"
            }
        }
    },
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: googleId, 
            clientSecret: googleSecret,  
        }, 
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60
        },
    },
    plugins: [
        jwt(), 
    ]
});