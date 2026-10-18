import { access, constants, readFile, writeFile } from "node:fs/promises";
import { EmbedBuilder, TextChannel } from "discord.js";
import { schedule } from "node-cron";

export function scheduleQotd(channel: TextChannel) {
  const cron: string = `${process.env.QOTD_SECOND ?? "0"} ${
    process.env.QOTD_MINUTE ?? "0"
  } ${process.env.QOTD_HOUR ?? "0"} * * *`;
  console.log(
    `Scheduled QOTD using cron "${cron}" (Timezone: ${
      process.env.QOTD_TIMEZONE
    })`,
  );
  schedule(
    cron,
    async () => {
      await handleQotd(channel);
    },
    {
      timezone: process.env.QOTD_TIMEZONE,
    },
  );
}

async function handleQotd(channel: TextChannel) {
  if (await fileExists("./ignored_qotd.json")) {
    let ignoredQotd: string[] = JSON.parse(
      await readFile("./ignored_qotd.json", "utf8"),
    );
    try {
      const qotdLink = process.env.QOTD_LINK;
      const response: string = qotdLink
        ? await fetch(qotdLink, {
            headers: {
              "User-Agent": "Wissididom/herokerrey-bot",
            },
          }).then((res) => res.text())
        : "";
      const lines: string[] = fisherYatesShuffle(response.split(/\r?\n/g));
      let chosenLine: string | null = null;
      for (const line of lines) {
        if (!ignoredQotd.includes(line)) {
          chosenLine = line;
          ignoredQotd.push(line);
          break;
        }
      }
      if (lines.length == ignoredQotd.length + 1) ignoredQotd = [];
      console.log(chosenLine);
      await channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("❓❔ Question of the Day ❔❓")
            .setDescription(chosenLine)
            .setColor(0xe75eff),
        ],
      });
      await writeFile("./ignored_qotd.json", JSON.stringify(ignoredQotd));
    } catch (err) {
      console.error(err);
    }
  }
}

async function fileExists(path: string) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function fisherYatesShuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
