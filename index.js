import "dotenv/config";

import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";

import { handleYuh } from "./yuh.js";
import { handleAutoResponder } from "./autoresponder.js";
import { handleTimezoneGenerator } from "./timezonegenerator.js";
import { handleQotd } from "./qotd.js";

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping, // Probably not needed and removed later
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, // Probably not needed and removed later
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
  ],
});

client.on(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  client.user?.setActivity({
    name: "twitch.tv/herokerrey",
    type: ActivityType.Watching,
  });
  await handleQotd(
    await client.channels.fetch(process.env.QOTD_CHANNEL),
    process.env.QOTD_TIMEZONE,
    parseInt(process.env.QOTD_HOUR),
    parseInt(process.env.QOTD_MINUTE),
    parseInt(process.env.QOTD_SECOND),
  );
});

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return; // skip messages by bots
  await handleYuh(msg, false);
  await handleAutoResponder(msg);
});

client.on(Events.MessageUpdate, async (msg) => {
  if (msg.author.bot) return; // skip messages by bots
  await handleYuh(msg, true);
});

client.on(Events.InteractionCreate, async (interaction) => {
  await handleTimezoneGenerator(interaction);
});

if (!process.env.DISCORD_TOKEN) {
  console.log(
    "DISCORD_TOKEN not found! You must specify your Discord bot token as DISCORD_TOKEN environment variable or put it in a `.env` file.",
  );
} else {
  client.login(process.env.DISCORD_TOKEN);
}
