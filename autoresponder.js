export async function handleAutoResponder(message) {
  if (
    process.env.AUTO_RESPONDER_EXCLUSION_CHANNEL_IDS.split(",").includes(
      message.channelId,
    )
  )
    return; // Don't do things in a channel listed in the exclusion channels
  let lowercaseMessageContent = message.content.toLowerCase();
  if (/\bdragon\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content:
        "Dragon DEEZ NUTS across yo mouth <:mindy_pog:834477380697063484>",
    });
  } else if (/\bsome of\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content:
        "Why not have some of DEEZ NUTS in yo mouth <:mindy_pog:834477380697063484>",
    });
  } else if (/\bleave\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content:
        "Why don't you LEAVE DEEZ NUTS in yo mouth? <:mindy_pog:834477380697063484>",
    });
  } else if (/\bleaving\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content:
        "Why not try LEAVING DEEZ NUTS in yo mouth? <:mindy_pog:834477380697063484>",
    });
  } else if (/\bsea of thieves\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content:
        "See if these NUTS fit in yo mouth? <:mindy_pog:834477380697063484>",
    });
  } else if (/\bsuck\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content: "Suck on DEEZ NUTS!  <:mindy_pog:834477380697063484>",
    });
  } else if (/\bnorway\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content:
        "Norway deez nuts fit in yo mouth <:mindy_pog:834477380697063484>",
    });
  } else if (/\bsub\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content: "Sub or shut up. <a:wiggle:1207805636243628052>",
    });
  } else if (/\bbutt\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content:
        "<a:wag:1210074155794305034> <a:wag:1210074155794305034> <a:wag:1210074155794305034>",
    });
  } else if (/\bjust dance\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({ content: "Gonna be ok. Da da do do!" });
  } else if (/\btry\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({ content: "TRY HARDER!!!!!" });
  } else if (/\bcan this\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({
      content: "Can DEEZ NUTS fit in yo mouth????",
    });
  } else if (/\bfall\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({ content: "Fall on DEEZ NUTS!!!" });
  } else if (/\bland\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({ content: "Land on DEEZ NUTS!!" });
  } else if (/\bputting\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({ content: "Putting DEEZ NUTS in yo mouth!" });
  } else if (/\bhi\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({ content: "hi" });
  } else if (/\bmorning\b/gi.test(lowercaseMessageContent)) {
    await message.channel.send({ content: "good morning! 🌞" });
  }
}
