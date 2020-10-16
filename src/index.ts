import dotenv from "dotenv";
import { Client } from "discord.js";
import parseGoogleDocsJson from "parse-google-docs-json";

dotenv.config();

const { BOT_TOKEN, PARSE_GOOGLE_DOCS_DOCUMENT_ID, PARSE_GOOGLE_DOCS_CLIENT_EMAIL, PARSE_GOOGLE_DOCS_PRIVATE_KEY } = process.env;
const DISCORD_CLIENT = new Client();

DISCORD_CLIENT.on("ready", () => {
    console.log(`Logged in as ${DISCORD_CLIENT.user.tag}!`);
});

DISCORD_CLIENT.on("message", async (messsage) => {
    // prevent the bot from responding itself
    if (messsage.author.id !== DISCORD_CLIENT.user.id) {
        // tip, always perform comparisons of insensitive case strings using uppercase
        if (messsage.content.toLocaleUpperCase() === "NEWS") {
            const parsed = await parseGoogleDocsJson({
                documentId: PARSE_GOOGLE_DOCS_DOCUMENT_ID,
                clientEmail: PARSE_GOOGLE_DOCS_CLIENT_EMAIL,
                privateKey: PARSE_GOOGLE_DOCS_PRIVATE_KEY,
            });

            console.log(parsed.toJson());
            console.log(parsed.toMarkdown());

            messsage.reply(parsed.toMarkdown());
        }
    }
});

DISCORD_CLIENT.login(BOT_TOKEN);
