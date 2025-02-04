import {
  ChatInputCommandInteraction,
  Interaction,
  MessageFlags,
} from "discord.js";

export async function handleVolumeConverter(
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
      case "volumes": {
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
          case "ml": {
            switch (target) {
              case "ml": {
                response = `${value}ml = ${value}ml`;
                break;
              }
              case "l": {
                response = `${value}ml = ${value / 1000}l`;
                break;
              }
              case "gal": {
                response = `${value}ml = ${value / 3785}gal`;
                break;
              }
              default: {
                response = `Please specify a volume unit to convert to`;
                break;
              }
            }
            break;
          }
          case "l": {
            switch (target) {
              case "ml": {
                response = `${value}l = ${value * 1000}ml`;
                break;
              }
              case "l": {
                response = `${value}l = ${value}l`;
                break;
              }
              case "gal": {
                response = `${value}l = ${value / 3.785}gal`;
                break;
              }
              default: {
                response = `Please specify a volume unit to convert to`;
                break;
              }
            }
            break;
          }
          case "gal": {
            switch (target) {
              case "ml": {
                response = `${value}gal = ${value * 3785}ml`;
                break;
              }
              case "l": {
                response = `${value}gal = ${value / 3.785}l`;
                break;
              }
              case "gal": {
                response = `${value}gal = ${value}gal`;
                break;
              }
              default: {
                response = `Please specify a volume unit to convert to`;
                break;
              }
            }
            break;
          }
          default: {
            response = `Please specify a volume unit to convert from`;
            break;
          }
        }
        await interaction.editReply({
          content: response,
        });
        console.log(`[volumes] ${response} (Public: ${pub})`);
        break;
      }
    }
  }
}
