import {
  Client,
  GatewayIntentBits,
  Partials,
  VoiceState,
} from 'discord.js';
import { createServer } from 'http';
import { DISCORD_TOKEN, PORT } from './config';
import { createHttpServer } from './httpServer';
import { sessionStore } from './sessionStore';

async function bootstrap() {
  if (!DISCORD_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is required');
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.GuildMember, Partials.User],
  });

  client.on('ready', () => {
    console.log(`[bot] Logged in as ${client.user?.tag}`);
  });

  client.on('voiceStateUpdate', (oldState: VoiceState, newState: VoiceState) => {
    const now = Date.now();
    const oldChannel = oldState.channelId;
    const newChannel = newState.channelId;
    const userId = newState.id;

    if (oldChannel && oldChannel !== newChannel) {
      sessionStore.handleUserLeave(oldChannel, userId, now);
    }
    if (newChannel && newChannel !== oldChannel) {
      sessionStore.handleUserJoin(newChannel, userId, now);
    }
  });

  await client.login(DISCORD_TOKEN);

  const app = createHttpServer(client);
  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`[bot] HTTP server listening on :${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('[bot] Fatal error', err);
  process.exit(1);
});


