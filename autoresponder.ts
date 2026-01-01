import { Message, TextChannel } from "discord.js";

export async function handleAutoResponder(message: Message) {
  if (message.author.bot) return;
  if (
    Deno.env.has("AUTO_RESPONDER_EXCLUSION_CHANNEL_IDS") &&
    Deno.env.get("AUTO_RESPONDER_EXCLUSION_CHANNEL_IDS")!.split(",").includes(
      message.channelId,
    )
  ) {
    return; // Don't do things in a channel listed in the exclusion channels
  }
  const randomNumber = Math.random();
  //console.log(randomNumber);
  if (randomNumber >= 0.2) {
    return; // Only run autoresponder ~20% of the time
  }
  const rules: Array<[RegExp, string]> = [
    [
      /\bdragon\b/gi,
      "Dragon DEEZ NUTS across yo mouth <:mindy_pog:834477380697063484>",
    ],
    [
      /\bsome of\b/gi,
      "Why not have some of DEEZ NUTS in yo mouth <:mindy_pog:834477380697063484>",
    ],
    [
      /\bleave\b/gi,
      "Why don't you LEAVE DEEZ NUTS in yo mouth? <:mindy_pog:834477380697063484>",
    ],
    [
      /\bleaving\b/gi,
      "Why not try LEAVING DEEZ NUTS in yo mouth? <:mindy_pog:834477380697063484>",
    ],
    [
      /\bsea of thieves\b/gi,
      "See if these NUTS fit in yo mouth? <:mindy_pog:834477380697063484>",
    ],
    [/\bsuck\b/gi, "Suck on DEEZ NUTS!  <:mindy_pog:834477380697063484>"],
    [
      /\bnorway\b/gi,
      "Norway deez nuts fit in yo mouth <:mindy_pog:834477380697063484>",
    ],
    [/\bsub\b/gi, "Sub or shut up. <a:wiggle:1207805636243628052>"],
    [
      /\bbutt\b/gi,
      "<a:wag:1210074155794305034> <a:wag:1210074155794305034> <a:wag:1210074155794305034>",
    ],
    [/\bjust dance\b/gi, "Gonna be ok. Da da do do!"],
    [/\btry\b/gi, "TRY HARDER!!!!!"],
    [/\bcan this\b/gi, "Can DEEZ NUTS fit in yo mouth????"],
    [/\bfall\b/gi, "Fall on DEEZ NUTS!!!"],
    [/\bland\b/gi, "Land on DEEZ NUTS!!"],
    [/\bputting\b/gi, "Putting DEEZ NUTS in yo mouth!"],
    [/\bhi\b/gi, "hi"],
    [/\bmorning\b/gi, "good morning! 🌞"],
  ];
  const lowercaseMessageContent: string = message.content.toLowerCase();
  for (const [regex, response] of rules) {
    if (regex.test(lowercaseMessageContent)) {
      await (message.channel as TextChannel).send({ content: response });
      break;
    }
  }
}
