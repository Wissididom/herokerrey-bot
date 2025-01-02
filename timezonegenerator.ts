import { DateTime } from "luxon";
import {
  ChatInputCommandInteraction,
  Interaction,
  MessageFlags,
} from "discord.js";

const SUPPORTED_TIMEZONES: string[] = Intl.supportedValuesOf("timeZone");

function getContent(unix: number, preferUsability: boolean = false) {
  if (preferUsability) {
    return `
<t:${unix}>: \`<t:${unix}>\`
<t:${unix}:t>: \`<t:${unix}:t>\`
<t:${unix}:T>: \`<t:${unix}:T>\`
<t:${unix}:d>: \`<t:${unix}:d>\`
<t:${unix}:D>: \`<t:${unix}:D>\`
<t:${unix}:f>: \`<t:${unix}:f>\`
<t:${unix}:F>: \`<t:${unix}:F>\`
<t:${unix}:R>: \`<t:${unix}:R>\`
		`;
  } else {
    return `
\`<t:${unix}>\`: <t:${unix}>
\`<t:${unix}:t>\`: <t:${unix}:t>
\`<t:${unix}:T>\`: <t:${unix}:T>
\`<t:${unix}:d>\`: <t:${unix}:d>
\`<t:${unix}:D>\`: <t:${unix}:D>
\`<t:${unix}:f>\`: <t:${unix}:f>
\`<t:${unix}:F>\`: <t:${unix}:F>
\`<t:${unix}:R>\`: <t:${unix}:R>
		`;
  }
}

function getConsoleContent(
  currenttimestamp: boolean,
  pub: boolean,
  day: number | null = null,
  month: number | null = null,
  year: number | null = null,
  hour: number | null = null,
  minute: number | null = null,
  second: number | null = null,
  timezone: string | null = null,
) {
  if (currenttimestamp) {
    return `[currenttimestamp] Executed /currenttimestamp (Public: ${pub})`;
  }
  return `[timestamp] Day: ${day}; Month: ${month}; Year: ${year}; Hour: ${hour}; Minute: ${minute}; Second: ${second}; Timezone: ${timezone}; Public: ${pub}`;
}

export async function handleTimezoneGenerator(interaction: Interaction) {
  if (interaction.isCommand()) {
    const preferUsability: boolean =
      (interaction as ChatInputCommandInteraction).options.getBoolean(
        "prefer_usability",
      ) == true;
    const pub: boolean =
      (interaction as ChatInputCommandInteraction).options.getBoolean(
        "public",
      ) == true;
    if (pub) {
      await interaction.deferReply();
    } else {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    }
    switch (interaction.commandName) {
      case "timestamp": {
        const day: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "day",
          ) ?? 1;
        const month: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "month",
          ) ?? 1;
        const year: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "year",
          ) ?? 1970;
        const hour: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "hour",
          ) ?? 0;
        const minute: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "minute",
          ) ?? 0;
        const second: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "second",
          ) ?? 0;
        const timezone: string | null =
          (interaction as ChatInputCommandInteraction)
            .options.getString("timezone");
        //Intl.DateTimeFormat().resolvedOptions().timeZone // own timezone
        const unix: number = DateTime.fromObject(
          {
            day,
            month,
            year,
            hour,
            minute,
            second,
          },
          { zone: timezone },
        ).toUnixInteger();
        await interaction.editReply({
          content: getContent(unix, preferUsability),
        });
        console.log(
          getConsoleContent(
            false,
            pub,
            day,
            month,
            year,
            hour,
            minute,
            second,
            timezone,
          ),
        );
        break;
      }
      case "currenttimestamp": {
        const unix: number = DateTime.now().toUnixInteger();
        await interaction.editReply({
          content: getContent(unix, preferUsability),
        });
        console.log(getConsoleContent(true, pub));
        break;
      }
      case "converttime": {
        const day: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "day",
          ) ?? 1;
        const month: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "month",
          ) ?? 1;
        const year: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "year",
          ) ?? 1;
        const hour: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "hour",
          ) ?? 1;
        const minute: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "minute",
          ) ?? 1;
        const second: number =
          (interaction as ChatInputCommandInteraction).options.getInteger(
            "second",
          ) ?? 1;
        const src: string | null = (interaction as ChatInputCommandInteraction)
          .options
          .getString("src");
        const dst: string | null = (interaction as ChatInputCommandInteraction)
          .options
          .getString("dst");
        const srcTimeObj: DateTime = DateTime.fromObject(
          {
            day,
            month,
            year,
            hour,
            minute,
            second,
          },
          { zone: src },
        );
        const srcTime: string = srcTimeObj.toLocaleString(
          DateTime.DATETIME_HUGE_WITH_SECONDS,
          { locale: "en-US" },
        );
        const dstTime: string = srcTimeObj
          .setZone(dst)
          .toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS, {
            locale: "en-US",
          });
        await interaction.editReply({
          content:
            `\`${srcTime}\` (Timezone: \`${src}\`) in \`${dst}\` is \`${dstTime}\``,
        });
        console.log(
          `[converttime] Day: ${day}; Month: ${month}; Year: ${year}; Hour: ${hour}; Minute: ${minute}; Second: ${second}; Source: ${src}; Destination: ${dst}; Public: ${pub}`,
        );
        break;
      }
      case "convertcurrenttime": {
        const timezone: string | null =
          (interaction as ChatInputCommandInteraction)
            .options.getString("timezone");
        const currenttime: DateTime = DateTime.now()
          .setZone(timezone)
          .toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS, {
            locale: "en-US",
          });
        await interaction.editReply({
          content: `The current time in \`${
            (interaction as ChatInputCommandInteraction).options.getString(
              "timezone",
            )
          }\` is \`${currenttime}\``,
        });
        console.log(
          `[convertcurrenttime] Executed /convertcurrenttime (Public: ${pub})`,
        );
        break;
      }
    }
  } else if (interaction.isAutocomplete()) {
    const timezoneResponse: string[] = SUPPORTED_TIMEZONES.filter((zone) => {
      return (
        zone
          .toLowerCase()
          .indexOf(
            interaction.options.getFocused().replace(" ", "_").toLowerCase(),
          ) >= 0
      );
    });
    timezoneResponse.length = Math.min(timezoneResponse.length, 25); // send max. 25 choices
    await interaction
      .respond(
        timezoneResponse.map((zone) => {
          return {
            name: zone,
            value: zone,
          };
        }),
      )
      .catch((err) => console.error(JSON.stringify(err)));
  }
}
