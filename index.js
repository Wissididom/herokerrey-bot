import "dotenv/config";

import { Client, Events, GatewayIntentBits, Partials } from "discord.js";

async function findWebhook(message) {}

async function handleYuh(message, isUpdate) {
  if (message.channelId != process.env.YUH_CHANNEL) return; // Only do things in the yuh channel
  if (message.webhookId) return; // skip messages from webhooks
  if (isUpdate) {
    await message.delete();
  } else {
    let webhooks = await message.channel.fetchWebhooks();
    let webhook = webhooks.find((webhook) => webhook.name === "yuh-bot");
    if (!webhook) {
      webhook = await message.channel.createWebhook({
        name: "yuh-bot",
        avatar:
          "https://cdn.discordapp.com/avatars/851881174142156820/c243b521c206bd70f8740d060fa61894.webp",
        reason: "yuh-bot",
      });
    }
    if (message.content == "yuh") {
      await webhook.send({
        content: process.env.YUH_EMOTE_CODE,
      });
    } else {
      await message.delete();
      let angryReply = await webhook.send({
        content: `‼️ SHAME ON U!!!!!  U MUST USE ${process.env.YUH_EMOTE_CODE} !!!!!! ‼️`,
      });
      setTimeout(() => angryReply.delete(), 10000);
      let logChannel = await message.client.channels.fetch(process.env.YUH_LOG);
      logChannel.send({
        content: `<@${message.author.id}> did NOT YUH!!!!!!!!`,
      });
    }
  }
}

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

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return; // skip messages by bots
  await handleYuh(msg, false);
});

client.on(Events.MessageUpdate, async (msg) => {
  if (msg.author.bot) return; // skip messages by bots
  await handleYuh(msg, true);
});

client.on(Events.InteractionCreate, async (interaction) => {
  // TODO: Handle Interactions, if there ever will be some
});

if (!process.env.DISCORD_TOKEN) {
  console.log(
    "DISCORD_TOKEN not found! You must specify your Discord bot token as DISCORD_TOKEN environment variable or put it in a `.env` file.",
  );
} else {
  client.login(process.env.DISCORD_TOKEN);
}
