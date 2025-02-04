import {
  ChatInputCommandInteraction,
  Interaction,
  MessageFlags,
} from "discord.js";

export async function handleLengthConverter(
  interaction: Interaction,
) {
  if (interaction.isChatInputCommand()) {
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
      case "lengths": {
        let response: string = "N/A";
        const source: string | null =
          (interaction as ChatInputCommandInteraction)
            .options.getString("source");
        const target: string | null =
          (interaction as ChatInputCommandInteraction)
            .options.getString("target");
        const value: number = (interaction as ChatInputCommandInteraction)
          .options.getNumber("value") ?? 1;
        switch (source) {
          case "mm": {
            switch (target) {
              case "mm": {
                response = `${value}mm = ${value}mm`;
                break;
              }
              case "cm": {
                response = `${value}mm = ${value / 10}cm`;
                break;
              }
              case "dm": {
                response = `${value}mm = ${value / 100}dm`;
                break;
              }
              case "m": {
                response = `${value}mm = ${value / 1000}m`;
                break;
              }
              case "km": {
                response = `${value}mm = ${value / 1000000}km`;
                break;
              }
              case "in": {
                response = `${value}mm = ${value / 25.4}in`;
                break;
              }
              case "ft": {
                response = `${value}mm = ${value / 304.8}ft`;
                break;
              }
              case "mi": {
                response = `${value}mm = ${value / 1609000000}mi`;
                break;
              }
              case "yd": {
                response = `${value}mm = ${value / 914.4}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "cm": {
            switch (target) {
              case "mm": {
                response = `${value}cm = ${value * 10}mm`;
                break;
              }
              case "cm": {
                response = `${value}cm = ${value}cm`;
                break;
              }
              case "dm": {
                response = `${value}cm = ${value / 10}dm`;
                break;
              }
              case "m": {
                response = `${value}cm = ${value / 100}m`;
                break;
              }
              case "km": {
                response = `${value}cm = ${value / 100000}km`;
                break;
              }
              case "in": {
                response = `${value}cm = ${value / 2.54}in`;
                break;
              }
              case "ft": {
                response = `${value}cm = ${value / 30.48}ft`;
                break;
              }
              case "mi": {
                response = `${value}cm = ${value / 160900}mi`;
                break;
              }
              case "yd": {
                response = `${value}cm = ${value / 91.44}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "dm": {
            switch (target) {
              case "mm": {
                response = `${value}dm = ${value * 100}mm`;
                break;
              }
              case "cm": {
                response = `${value}dm = ${value * 10}cm`;
                break;
              }
              case "dm": {
                response = `${value}dm = ${value}dm`;
                break;
              }
              case "m": {
                response = `${value}dm = ${value / 10}m`;
                break;
              }
              case "km": {
                response = `${value}dm = ${value / 10000}km`;
                break;
              }
              case "in": {
                response = `${value}dm = ${value / 3.937}in`;
                break;
              }
              case "ft": {
                response = `${value}dm = ${value / 3.048}ft`;
                break;
              }
              case "mi": {
                response = `${value}dm = ${value / 16090}mi`;
                break;
              }
              case "yd": {
                response = `${value}dm = ${value / 9.144}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "m": {
            switch (target) {
              case "mm": {
                response = `${value}m = ${value * 1000}mm`;
                break;
              }
              case "cm": {
                response = `${value}m = ${value * 100}cm`;
                break;
              }
              case "dm": {
                response = `${value}m = ${value * 10}dm`;
                break;
              }
              case "m": {
                response = `${value}m = ${value}m`;
                break;
              }
              case "km": {
                response = `${value}m = ${value / 1000}km`;
                break;
              }
              case "in": {
                response = `${value}m = ${value * 39.37}in`;
                break;
              }
              case "ft": {
                response = `${value}m = ${value * 3.281}ft`;
                break;
              }
              case "mi": {
                response = `${value}m = ${value / 1609}mi`;
                break;
              }
              case "yd": {
                response = `${value}m = ${value * 1.094}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "km": {
            switch (target) {
              case "mm": {
                response = `${value}km = ${value * 1000000}mm`;
                break;
              }
              case "cm": {
                response = `${value}km = ${value * 100000}cm`;
                break;
              }
              case "dm": {
                response = `${value}km = ${value * 10000}dm`;
                break;
              }
              case "m": {
                response = `${value}km = ${value * 1000}m`;
                break;
              }
              case "km": {
                response = `${value}km = ${value}km`;
                break;
              }
              case "in": {
                response = `${value}km = ${value * 39370}in`;
                break;
              }
              case "ft": {
                response = `${value}km = ${value * 3281}ft`;
                break;
              }
              case "mi": {
                response = `${value}km = ${value / 1609}mi`;
                break;
              }
              case "yd": {
                response = `${value}km = ${value * 1094}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "in": {
            switch (target) {
              case "mm": {
                response = `${value}in = ${value * 25.4}mm`;
                break;
              }
              case "cm": {
                response = `${value}in = ${value * 2.54}cm`;
                break;
              }
              case "dm": {
                response = `${value}in = ${value / 3937}dm`;
                break;
              }
              case "m": {
                response = `${value}in = ${value / 39.37}m`;
                break;
              }
              case "km": {
                response = `${value}in = ${value / 39370}km`;
                break;
              }
              case "in": {
                response = `${value}in = ${value}in`;
                break;
              }
              case "ft": {
                response = `${value}in = ${value / 12}ft`;
                break;
              }
              case "mi": {
                response = `${value}in = ${value / 63360}mi`;
                break;
              }
              case "yd": {
                response = `${value}in = ${value / 36}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "ft": {
            switch (target) {
              case "mm": {
                response = `${value}ft = ${value * 304.8}mm`;
                break;
              }
              case "cm": {
                response = `${value}ft = ${value * 30.48}cm`;
                break;
              }
              case "dm": {
                response = `${value}ft = ${value * 3.048}dm`;
                break;
              }
              case "m": {
                response = `${value}ft = ${value / 3.281}m`;
                break;
              }
              case "km": {
                response = `${value}ft = ${value / 3281}km`;
                break;
              }
              case "in": {
                response = `${value}ft = ${value * 12}in`;
                break;
              }
              case "ft": {
                response = `${value}ft = ${value}ft`;
                break;
              }
              case "mi": {
                response = `${value}ft = ${value / 5280}mi`;
                break;
              }
              case "yd": {
                response = `${value}ft = ${value / 3}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "mi": {
            switch (target) {
              case "mm": {
                response = `${value}mi = ${value * 1609000}mm`;
                break;
              }
              case "cm": {
                response = `${value}mi = ${value * 160900}cm`;
                break;
              }
              case "dm": {
                response = `${value}mi = ${value * 16090}dm`;
                break;
              }
              case "m": {
                response = `${value}mi = ${value * 1609}m`;
                break;
              }
              case "km": {
                response = `${value}mi = ${value * 1.609}km`;
                break;
              }
              case "in": {
                response = `${value}mi = ${value * 63360}in`;
                break;
              }
              case "ft": {
                response = `${value}mi = ${value * 5280}ft`;
                break;
              }
              case "mi": {
                response = `${value}mi = ${value}mi`;
                break;
              }
              case "yd": {
                response = `${value}mi = ${value * 1760}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          case "yd": {
            switch (target) {
              case "mm": {
                response = `${value}yd = ${value * 914.4}mm`;
                break;
              }
              case "cm": {
                response = `${value}yd = ${value * 91.44}cm`;
                break;
              }
              case "dm": {
                response = `${value}yd = ${value * 9.144}dm`;
                break;
              }
              case "m": {
                response = `${value}yd = ${value / 1.094}m`;
                break;
              }
              case "km": {
                response = `${value}yd = ${value / 1094}km`;
                break;
              }
              case "in": {
                response = `${value}yd = ${value * 36}in`;
                break;
              }
              case "ft": {
                response = `${value}yd = ${value * 3}ft`;
                break;
              }
              case "mi": {
                response = `${value}yd = ${value / 1760}mi`;
                break;
              }
              case "yd": {
                response = `${value}yd = ${value}yd`;
                break;
              }
              default: {
                response = `Please specify a length unit to convert to`;
                break;
              }
            }
            break;
          }
          default: {
            response = `Please specify a length unit to convert from`;
            break;
          }
        }
        await interaction.editReply({
          content: response,
        });
        console.log(`[weights] ${response} (Public: ${pub})`);
        break;
      }
    }
  }
}
