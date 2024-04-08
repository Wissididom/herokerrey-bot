import { DateTime } from "luxon";
import * as fs from "fs";

export async function handleQotd(channel, timezone, hour, minute, second) {
  await internalHandleQotd(channel, timezone, hour, minute, second);
  setInterval(async () => {
    await internalHandleQotd(channel, timezone, hour, minute, second);
  }, 60 * 1000);
}

async function internalHandleQotd(channel, timezone, hour, minute, second) {
  let postingTime = DateTime.fromObject(
    {
      hour,
      minute,
      second,
    },
    { zone: timezone },
  );
  let postingHour = postingTime.hour;
  let postingMinute = postingTime.minute;
  let currentTime = DateTime.now().setZone(timezone);
  let currentHour = currentTime.hour;
  let currentMinute = currentTime.minute;
  if (currentHour == postingHour && currentMinute == postingMinute) {
    console.log("hour and minute fits");
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
        fs.writeFileSync("./ignored_qotd.json", JSON.stringify(ignoredQotd), {
          encoding: "utf8",
        });
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    console.log("hour and minute does not fit");
  }
}

function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
