import {
  Message,
  NewsChannel,
  PartialMessage,
  Snowflake,
  TextChannel,
  ThreadChannel,
  Webhook,
} from "discord.js";

let YUH_LOG_THREAD: ThreadChannel | null = null;

async function findThreadById(
  message: Message | PartialMessage,
  id: Snowflake,
): Promise<ThreadChannel | null> {
  const channels = await message.guild?.channels.fetch();
  if (!channels) return null;
  for (const [, channel] of channels) {
    if (!channel) continue; // Channel is null. How did you even reach that case?!
    if (channel instanceof TextChannel || channel instanceof NewsChannel) {
      if (!channel.threads) continue; // Probably a channel that does not have threads like a VC
      return await channel.threads.fetch(id);
    } else {
      continue;
    }
  }
  return null;
}

export async function handleYuh(
  message: Message | PartialMessage,
  isUpdate: boolean,
) {
  if (message.channelId != Deno.env.get("YUH_CHANNEL")) return; // Only do things in the yuh channel
  if (message.webhookId) return; // skip messages from webhooks
  if (isUpdate) {
    await message.delete();
  } else {
    const webhooks = await (message.channel as TextChannel).fetchWebhooks();
    let webhook: Webhook | null = webhooks.find((webhook) =>
      webhook.name === "yuh-bot"
    ) ?? null;
    if (!webhook) {
      webhook = await (message.channel as TextChannel).createWebhook({
        name: "yuh-bot",
        avatar:
          "https://cdn.discordapp.com/avatars/851881174142156820/c243b521c206bd70f8740d060fa61894.webp",
        reason: "yuh-bot",
      });
    }
    const content = message.content?.trim() ?? "";
    const emote = Deno.env.get("YUH_EMOTE_CODE") ?? "";
    const parts = content.split(/\s+/g);
    const isYuh =
      parts.length > 0 && parts.every((part) => part.toLowerCase() === "yuh") ||
      (emote && parts.length > 0 && parts.every((part) => part === emote));
    if (isYuh) {
      await webhook.send({
        content: Deno.env.get("YUH_EMOTE_CODE"),
      });
    } else {
      await message.delete();
      const angryReply: Message = await webhook.send({
        content: `‼️ SHAME ON U!!!!!  U MUST USE ${
          Deno.env.get("YUH_EMOTE_CODE")
        } !!!!!! ‼️`,
      });
      setTimeout(() => angryReply.delete(), 10000);
      if (!Deno.env.has("YUH_LOG_THREAD")) {
        return; // Log thread not in env vars. Skip searching for it
      }
      YUH_LOG_THREAD = YUH_LOG_THREAD ??
        (await findThreadById(message, Deno.env.get("YUH_LOG_THREAD")!));
      if (YUH_LOG_THREAD) {
        YUH_LOG_THREAD.send({
          content: `<@${message.author?.id}> did NOT YUH!!!!!!!!`,
        });
      }
    }
  }
}
