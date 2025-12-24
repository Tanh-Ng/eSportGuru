import 'dotenv/config';

export const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN as string;
export const GUILD_ID = process.env.DISCORD_GUILD_ID as string;
export const PORT = Number(process.env.BOT_PORT || 4001);
export const CATEGORY_ID = process.env.DISCORD_CATEGORY_ID as string | undefined;
export const CATEGORY_NAME = process.env.DISCORD_CATEGORY_NAME || 'eSportGuru Sessions';

if (!DISCORD_TOKEN) {
  console.warn('[bot] DISCORD_BOT_TOKEN is not set');
}

if (!GUILD_ID) {
  console.warn('[bot] DISCORD_GUILD_ID is not set');
}


