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

export async function handleYuh(message, isUpdate) {
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
