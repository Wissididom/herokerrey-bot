import {
  ChatInputCommandInteraction,
  Interaction,
  MessageFlags,
} from "discord.js";

export async function handleWeightConverter(
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
      case "weights": {
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
          case "g": {
            switch (target) {
              case "g": {
                response = `${value}g = ${value}g`;
                break;
              }
              case "kg": {
                response = `${value}g = ${value / 1000}kg`;
                break;
              }
              case "oz": {
                response = `${value}g = ${value / 28.35}oz`;
                break;
              }
              case "lb": {
                response = `${value}g = ${value / 453.6}lb`;
                break;
              }
              default: {
                response = `Please specify a weight unit to convert to`;
                break;
              }
            }
            break;
          }
          case "kg": {
            switch (target) {
              case "g": {
                response = `${value}kg = ${value * 1000}g`;
                break;
              }
              case "kg": {
                response = `${value}kg = ${value}kg`;
                break;
              }
              case "oz": {
                response = `${value}kg = ${value * 35.274}oz`;
                break;
              }
              case "lb": {
                response = `${value}kg = ${value * 2.205}lb`;
                break;
              }
              default: {
                response = `Please specify a weight unit to convert to`;
                break;
              }
            }
            break;
          }
          case "oz": {
            switch (target) {
              case "g": {
                response = `${value}oz = ${value * 28.35}g`;
                break;
              }
              case "kg": {
                response = `${value}oz = ${value / 35.274}kg`;
                break;
              }
              case "oz": {
                response = `${value}oz = ${value}oz`;
                break;
              }
              case "lb": {
                response = `${value}oz = ${value / 16}lb`;
                break;
              }
              default: {
                response = `Please specify a weight unit to convert to`;
                break;
              }
            }
            break;
          }
          case "lb": {
            switch (target) {
              case "g": {
                response = `${value}lb = ${value * 453.6}g`;
                break;
              }
              case "kg": {
                response = `${value}lb = ${value / 2.205}kg`;
                break;
              }
              case "oz": {
                response = `${value}lb = ${value * 16}oz`;
                break;
              }
              case "lb": {
                response = `${value}lb = ${value}lb`;
                break;
              }
              default: {
                response = `Please specify a weight unit to convert to`;
                break;
              }
            }
            break;
          }
          default: {
            response = `Please specify a weight unit to convert from`;
            break;
          }
        }
        await interaction.editReply({
          content: response,
        });
        console.log(`[lengths] ${response} (Public: ${pub})`);
        break;
      }
    }
  }
}
