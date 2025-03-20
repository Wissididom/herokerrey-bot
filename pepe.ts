import { Message, PartialMessage } from "discord.js";

export async function handlePepe(
  message: Message | PartialMessage,
  _isUpdate: boolean,
) {
  if (message.webhookId) return; // skip messages from webhooks
  const ignoredRoles = Deno.env.get("PEPE_IGNORED_ROLES")?.split(",");
  if (ignoredRoles) {
    for (const ignoredRole of ignoredRoles) {
      console.log(ignoredRole);
      if (message.member.roles.cache.find((r) => r.id == ignoredRole)) {
        console.log("Ignored");
        // If user has an ignored role skip pepe handler
        return true;
      }
    }
  }
  // https://discord.com/developers/docs/reference#message-formatting
  if (/<a?:[Pp]+[Ee]+[Pp]+(?:[Ee]|[Oo])+.*:\d+>/gi.test(message.content)) {
    const reply = await message.reply({
      content: `<@${message.author.id}> please don't post any pepe emotes`,
      allowedMentions: { parse: [] },
    });
    await message.delete();
    setTimeout(async () => await reply.delete(), 2 * 60 * 1000);
    return false;
  }
  return true;
}
