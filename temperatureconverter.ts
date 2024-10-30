import { ChatInputCommandInteraction, Interaction } from "discord.js";

export async function handleTemperatureConverter(
  interaction: Interaction,
) {
  if (interaction.isCommand()) {
    const ephemeral: boolean = !(interaction as ChatInputCommandInteraction)
      .options.getBoolean("public");
    switch (interaction.commandName) {
      case "temperature": {
        await interaction.deferReply({ ephemeral });
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
          case "c": {
            switch (target) {
              case "c": {
                response = `${value} °C = ${value} °C`;
                break;
              }
              case "f": {
                response = `${value} °C = ${(9.0 / 5.0) * value + 32.0} °F`;
                break;
              }
              case "k": {
                response = `${value} °C = ${value + 273.15} K`;
                break;
              }
              case "r": {
                response = `${value} °C = ${value * (9.0 / 5.0) + 491.67} °R`;
                break;
              }
              case "é": {
                // fallthrough
              }
              case "e": {
                response = `${value} °C = ${(value * 4.0) / 5.0} °Ré`;
                break;
              }
              default: {
                response = `Please specify a temperature unit to convert to`;
                break;
              }
            }
            break;
          }
          case "f": {
            switch (target) {
              case "c": {
                response = `${value} °F = ${(value - 32.0) / (9.0 / 5.0)} °C`;
                break;
              }
              case "f": {
                response = `${value} °F = ${value} °F`;
                break;
              }
              case "k": {
                response = `${value} °F = ${((value + 459.67) * 5.0) / 9.0} K`;
                break;
              }
              case "r": {
                response = `${value} °F = ${value + 459.67} °R`;
                break;
              }
              case "é": {
                // fallthrough
              }
              case "e": {
                response = `${value} °F = ${((value - 32.0) * 4.0) / 9.0} °Ré`;
                break;
              }
              default: {
                response = `Please specify a temperature unit to convert to`;
                break;
              }
            }
            break;
          }
          case "k": {
            switch (target) {
              case "c": {
                response = `${value} K = ${value - 273.15} °C`;
                break;
              }
              case "f": {
                response = `${value} K = ${(value * 9.0) / 5.0 - 459.67} °F`;
                break;
              }
              case "k": {
                response = `${value} K = ${value} K`;
                break;
              }
              case "r": {
                response = `${value} K = ${(value * 9.0) / 5.0} °R`;
                break;
              }
              case "é": {
                // fallthrough
              }
              case "e": {
                response = `${value} °C = ${
                  ((value - 273.15) * 4.0) / 5.0
                } °Ré`;
                break;
              }
              default: {
                response = `Please specify a temperature unit to convert to`;
                break;
              }
            }
            break;
          }
          case "r": {
            switch (target) {
              case "c": {
                response = `${value} °R = ${((value - 491.67) * 5.0) / 9.0} °C`;
                break;
              }
              case "f": {
                response = `${value} °R = ${value - 459.67} °F`;
                break;
              }
              case "k": {
                response = `${value} °R = ${(value * 5.0) / 9.0} K`;
                break;
              }
              case "r": {
                response = `${value} °R = ${value} °R`;
                break;
              }
              case "é": {
                // fallthrough
              }
              case "e": {
                response = `${value} °R = ${
                  ((value - 491.67) * 4.0) / 9.0
                } °Ré`;
                break;
              }
              default: {
                response = `Please specify a temperature unit to convert to`;
                break;
              }
            }
            break;
          }
          case "é": {
            // fallthrough
          }
          case "e": {
            switch (target) {
              case "c": {
                response = `${value} °Ré = ${(value * 5.0) / 4.0} °C`;
                break;
              }
              case "f": {
                response = `${value} °Ré = ${(value * 9.0) / 4.0 + 32.0} °F`;
                break;
              }
              case "k": {
                response = `${value} °Ré = ${(value * 5.0) / 4.0 + 273.15} K`;
                break;
              }
              case "r": {
                response = `${value} °Ré = ${(value * 9.0) / 4.0 + 491.67} °R`;
                break;
              }
              case "é": {
                // fallthrough
              }
              case "e": {
                response = `${value} °Ré = ${value} °Ré`;
                break;
              }
              default: {
                response = `Please specify a temperature unit to convert to`;
                break;
              }
            }
            break;
          }
          default: {
            response = `Please specify a temperature unit to convert from`;
            break;
          }
        }
        await interaction.editReply({
          content: response,
        });
        console.log(`[temperature] ${response} (Ephemeral: ${ephemeral})`);
        break;
      }
    }
  }
}
