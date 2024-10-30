import { EmbedBuilder } from "discord.js";
import { schedule } from "node-cron";
import * as fs from "fs";

export async function handleQotd(channel) {
  schedule(
    `${process.env.QOTD_SECOND ?? "0"} ${process.env.QOTD_MINUTE ?? "0"} ${process.env.QOTD_HOUR ?? "0"} * * *`,
    async () => {
      await internalHandleQotd(channel);
    },
    {
      scheduled: true,
      timezone: process.env.QOTD_TIMEZONE,
    },
  );
}

async function internalHandleQotd(channel) {
  if (fs.existsSync("./ignored_qotd.json")) {
    let ignoredQotd = JSON.parse(
      fs.readFileSync("./ignored_qotd.json", { encoding: "utf8", flag: "r" }),
    );
    try {
      let response = await fetch("https://pastebin.com/raw/9vFjjvZh").then(
        (res) => res.text(),
      );
      let lines = response.split(/\r?\n/g);
      lines = fisherYatesShuffle(lines);
      let chosenLine = null;
      for (let line of lines) {
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
      fs.writeFileSync("./ignored_qotd.json", JSON.stringify(ignoredQotd), {
        encoding: "utf8",
      });
    } catch (err) {
      console.error(err);
    }
  }
}

function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
