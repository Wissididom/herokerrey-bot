import "dotenv/config";

import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";

let YUH_LOG_THREAD = null;

async function findThreadById(message, id) {
  for (let channel of (await message.guild.channels.fetch()).values()) {
    if (!channel.threads) continue; // Probably a channel that does not have threads like a VC
    for (let thread of (await channel.threads.fetch()).threads.values()) {
      if (thread.id == id) {
        return thread;
      }
    }
  }
  return null;
}

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
    if (
      message.content == "yuh" ||
      message.content == process.env.YUH_EMOTE_CODE
    ) {
      await webhook.send({
        content: process.env.YUH_EMOTE_CODE,
      });
    } else {
      await message.delete();
      let angryReply = await webhook.send({
        content: `‼️ SHAME ON U!!!!!  U MUST USE ${process.env.YUH_EMOTE_CODE} !!!!!! ‼️`,
      });
      setTimeout(() => angryReply.delete(), 10000);
      YUH_LOG_THREAD =
        YUH_LOG_THREAD ??
        (await findThreadById(message, process.env.YUH_LOG_THREAD));
      YUH_LOG_THREAD.send({
        content: `<@${message.author.id}> did NOT YUH!!!!!!!!`,
      });
    }
  }
}

async function handleButtyBot(message) {
  if (
    process.env.BUTTY_BOT_EXCLUSION_CHANNEL_IDS.split(",").includes(
      message.channelId,
    )
  )
    return; // Don't do things in a channel listed in the exclusion channels
  let lowercaseMessageContent = message.content.toLowerCase();
  if (lowercaseMessageContent.includes("dragon")) {
    await message.channel.send({
      content:
        "Dragon DEEZ NUTS across yo mouth <:mindy_pog:834477380697063484>",
    });
  }
  if (lowercaseMessageContent.includes("some of")) {
    await message.channel.send({
      content:
        "Why not have some of DEEZ NUTS in yo mouth <:mindy_pog:834477380697063484>",
    });
  }
  if (lowercaseMessageContent.includes("leave")) {
    await message.channel.send({
      content:
        "Why don't you LEAVE DEEZ NUTS in yo mouth? <:mindy_pog:834477380697063484>",
    });
  }
  if (lowercaseMessageContent.includes("leaving")) {
    await message.channel.send({
      content:
        "Why not try LEAVING DEEZ NUTS in yo mouth? <:mindy_pog:834477380697063484>",
    });
  }
  if (lowercaseMessageContent.includes("sea of thieves")) {
    await message.channel.send({
      content:
        "See if these NUTS fit in yo mouth? <:mindy_pog:834477380697063484>",
    });
  }
  if (lowercaseMessageContent.includes("suck")) {
    await message.channel.send({
      content: "Suck on DEEZ NUTS!  <:mindy_pog:834477380697063484>",
    });
  }
  if (lowercaseMessageContent.includes("norway")) {
    await message.channel.send({
      content:
        "Norway deez nuts fit in yo mouth <:mindy_pog:834477380697063484>",
    });
  }
  if (lowercaseMessageContent.includes("sub")) {
    await message.channel.send({
      content: "Sub or shut up. <a:wiggle:1207805636243628052>",
    });
  }
  if (lowercaseMessageContent.includes("butt")) {
    await message.channel.send({
      content:
        "<a:wag:1210074155794305034> <a:wag:1210074155794305034> <a:wag:1210074155794305034>",
    });
  }
  if (lowercaseMessageContent.includes("just dance")) {
    await message.channel.send({ content: "Gonna be ok. Da da do do!" });
  }
  if (lowercaseMessageContent.includes("try")) {
    await message.channel.send({ content: "TRY HARDER!!!!!" });
  }
  if (lowercaseMessageContent.includes("can this")) {
    await message.channel.send({
      content: "Can DEEZ NUTS fit in yo mouth????",
    });
  }
  if (lowercaseMessageContent.includes("fall")) {
    await message.channel.send({ content: "Fall on DEEZ NUTS!!!" });
  }
  if (lowercaseMessageContent.includes("land")) {
    await message.channel.send({ content: "Land on DEEZ NUTS!!" });
  }
  if (lowercaseMessageContent.includes("putting")) {
    await message.channel.send({ content: "Putting DEEZ NUTS in yo mouth!" });
  }
  if (lowercaseMessageContent.includes("hi")) {
    await message.channel.send({ content: "hi" });
  }
  if (lowercaseMessageContent.includes("morning")) {
    await message.channel.send({ content: "good morning! 🌞" });
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
  client.user?.setActivity({
    name: "twitch.tv/herokerrey",
    type: ActivityType.Watching,
  });
});

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return; // skip messages by bots
  await handleYuh(msg, false);
  await handleButtyBot(msg);
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
