import { Attachment, Message, PermissionsBitField } from "discord.js";

export async function handleHoneypot(
  message: Message,
  honeypotChannelId: string,
  honeypotLogChannelId: string | null,
) {
  if (message.channelId == honeypotChannelId) {
    console.log("Honeypot post");
    if (
      message.member?.permissions.has(
        PermissionsBitField.Flags.Administrator,
        false,
      )
    ) {
      // Administrator
      return;
    }
    if (!message.member) return;
    await message.member.send({
      content: `You sent a message in the ${
        message.channel.isDMBased() ? "DM" : message.channel.name
      } channel. If you've been hacked, change your passwords and reset your operating system, for the case that you've gotten Malware on it. You were soft-banned/kicked.`,
    }).catch(console.error);
    const memberId = message.member.id;
    await message.member.ban({
      deleteMessageSeconds: 60 * 60, /*last hour*/
      reason: "Honeypot triggered",
    }).then(console.log).catch(console.error);
    if (!memberId) return;
    await message.guild?.members.unban(memberId, "Honeypot triggered")
      .then(console.log).catch(console.error);
    if (honeypotLogChannelId !== null) {
      try {
        const channel = await message.guild?.channels.fetch(
          honeypotLogChannelId,
        );
        if (channel?.isSendable()) {
          const attachments: Attachment[] = [];
          for (const [_, attachment] of message.attachments) {
            attachments.push(attachment);
          }
          await channel?.send({
            content:
              `<@${message.author.id}> (${message.author.username}) triggered honeypot:\nMessage:\n\`\`\`\n${message.content}\n\`\`\``,
            files: attachments,
          });
        }
      } catch {
        // do nothing as this should only happen if there are connectivity problems with Discord, permission problems or not finding the channel
      }
    }
  }
}
