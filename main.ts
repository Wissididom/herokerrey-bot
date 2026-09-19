import {
  ActivityType,
  Channel,
  Client,
  Events,
  GatewayIntentBits,
  Message,
  Partials,
  TextChannel,
} from "discord.js";

import { handleYuh } from "./yuh.ts";
import { handleAutoResponder } from "./autoresponder.ts";
import { handleTimezoneGenerator } from "./timezonegenerator.ts";
import { handleTemperatureConverter } from "./temperatureconverter.ts";
import { handleLengthConverter } from "./lengthconverter.ts";
import { handleWeightConverter } from "./weightconverter.ts";
import { handleVolumeConverter } from "./volumeconverter.ts";
import { handleHoneypot } from "./honeypot.ts";
import { scheduleQotd } from "./qotd.ts";

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
  if (Deno.env.has("QOTD_CHANNEL")) {
    const channel: Channel | null = await client.channels.fetch(
      Deno.env.get("QOTD_CHANNEL")!,
    );
    if (channel) {
      scheduleQotd(channel as TextChannel);
    }
  }
});

client.on(Events.MessageCreate, async (msg: Message) => {
  if (msg.author.id == "656621136808902656" && msg.embeds.length > 0) {
    const embedDescription = msg.embeds[0].description;
    if (!embedDescription) return;
    const userRegex = /<@!?(\d+)>/g;
    const userIds = [...embedDescription.matchAll(userRegex)].map((m) => m[1]);
    const users = await Promise.all(userIds.map(async (id) => {
      try {
        return await client.users.fetch(id);
      } catch {
        return null;
      }
    }));
    const usernames = users.filter((u): u is NonNullable<typeof u> =>
      u !== null
    ).map((u) => u.username);
    if (usernames.length < 1) return;
    try {
      if (msg.channel.isSendable()) {
        await msg.channel.send({ content: usernames.join(", ") });
      } else {
        console.error(
          "Could not send message for resolving birthday bot mentions (channel is not sendable)",
        );
      }
    } catch (err) {
      console.error(
        "Could not send message for resolving birthday bot mentions (exception occured)",
        err,
      );
    }
    return;
  }
  if (msg.author.system) return; // skip system messages
  if (msg.author.bot) return; // skip messages by bots
  if (Deno.env.has("HONEYPOT_CHANNEL")) {
    await handleHoneypot(msg, Deno.env.get("HONEYPOT_CHANNEL")!);
  }
  await handleYuh(msg, false);
  await handleAutoResponder(msg);
});

client.on(Events.MessageUpdate, async (msg) => {
  if (msg.author?.bot) return; // skip messages by bots
  await handleYuh(msg, true);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!(interaction.isChatInputCommand() || interaction.isAutocomplete())) {
    return;
  }
  switch (interaction.commandName) {
    case "temperature":
      await handleTemperatureConverter(interaction);
      break;
    case "lengths":
      await handleLengthConverter(interaction);
      break;
    case "weights":
      await handleWeightConverter(interaction);
      break;
    case "volumes":
      await handleVolumeConverter(interaction);
      break;
    default:
      await handleTimezoneGenerator(interaction);
      break;
  }
});

if (!Deno.env.has("DISCORD_TOKEN")) {
  console.log(
    "DISCORD_TOKEN not found! You must specify your Discord bot token as DISCORD_TOKEN environment variable or put it in a `.env` file and use the `--env` command line switch",
  );
} else {
  client.login(Deno.env.get("DISCORD_TOKEN"));
}
