import "dotenv/config";
import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { environment } from "./config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { data, execute } = await import(`file://${filePath}`);
    if (data && execute) {
      commands.push(data.toJSON());
    } else {
      console.log(
        ` [🔓] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

export const deployCommands = async () => {
  try {
    console.log(
      ` [🍻] Started refreshing ${commands.length} application (/) commands.`,
    );
    const data = await rest.put(
      environment == "development"
        ? Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID,
          )
        : Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log(
      ` [🍻] Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
};
