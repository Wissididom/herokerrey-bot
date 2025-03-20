import {
  EmbedBuilder,
  Message,
  MessageReaction,
  MessageReactionEventDetails,
  PartialMessage,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";

export async function handlePepe(
  message: Message | PartialMessage,
  _isUpdate: boolean,
) {
  if (message.webhookId) return; // skip messages from webhooks
  const ignoredRoles = Deno.env.get("PEPE_IGNORED_ROLES")?.split(",");
  if (ignoredRoles) {
    for (const ignoredRole of ignoredRoles) {
      if (message.member?.roles.cache.find((r) => r.id == ignoredRole)) {
        // If user has an ignored role skip pepe handler
        return true;
      }
    }
  }
  // https://discord.com/developers/docs/reference#message-formatting
  if (
    message.content &&
    /<a?:.*[Pp]+[Ee]+[Pp]+(?:[Ee]|[Oo])+.*:\d+>/gi.test(message.content)
  ) {
    const reply = await message.reply({
      content: `<@${message.author?.id}> please don't post any pepe emotes`,
      allowedMentions: { parse: [] },
    });
    await message.delete();
    setTimeout(async () => await reply.delete(), 2 * 60 * 1000);
    return false;
  }
  return true;
}

export async function handleReactionPepe(
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
  _details: MessageReactionEventDetails,
) {
  if (
    reaction.emoji.name &&
    /[Pp]+[Ee]+[Pp]+(?:[Ee]|[Oo])+/gi.test(reaction.emoji.name)
  ) {
    if (!Deno.env.has("PEPE_LOG_CHANNEL")) {
      await reaction.remove();
      return;
    }
    const logChannel = await reaction.client.channels.fetch(
      Deno.env.get("PEPE_LOG_CHANNEL")!,
    );
    if (!logChannel || !logChannel.isSendable()) {
      await reaction.remove();
      return;
    }
    logChannel.send({
      embeds: [
        new EmbedBuilder().setTitle("Pepe-Reaction removed").addFields(
          {
            name: "Count",
            value: reaction.count?.toString() ?? "N/A",
          },
          {
            name: "Normal",
            value: reaction.countDetails.normal.toString(),
          },
          {
            name: "Super",
            value: reaction.countDetails.burst.toString(),
          },
          {
            name: "Image",
            value: reaction.emoji.imageURL() ?? "N/A",
          },
          {
            name: "Emoji-ID",
            value: reaction.emoji.id ?? "N/A",
          },
          {
            name: "Emoji-Name",
            value: reaction.emoji.name ?? "N/A",
          },
          {
            name: "Message",
            value: `[Jump to Message](<${reaction.message.url}>)`,
          },
          {
            name: "User",
            value: `<@${user.id}> (${user.username})`,
          },
        ),
      ],
    });
    await reaction.remove();
  }
}
