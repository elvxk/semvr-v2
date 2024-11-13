import { Events, ActivityType } from "discord.js";
import { announce } from "../util/announce.js";
import "dotenv/config";
import { environment, send_announce } from "../config.js";

export const name = Events.ClientReady;
export const once = true;
export const execute = (client) => {
  const activity = [
    "🌼 Punokawan",
    "🌼 Pandawa",
    "🌼 SEMVR V1",
    "🌼 Karangkadempel",
  ];
  let enuma = 0;
  setInterval(() => {
    if (enuma < activity.length - 1) {
      enuma++;
    } else {
      enuma = 0;
    }
    client.user.setActivity(activity[enuma], {
      type: ActivityType.Watching,
    });
  }, 5000);
  const semvr =
    "  ___  ___ _ __ _____   ___ __ \r\n" +
    " / __|/ _ \\ '_ ` _ \\ \\ / / '__|\r\n" +
    " \\__ \\  __/ | | | | \\ V /| |   \r\n" +
    " |___/\\___|_| |_| |_|\\_/ |_|   \r\n";

  console.log(semvr);
  console.log(` [🍻] Ready! Logged in as ${client.user.tag}`);
  console.log(` [🍻] Watching ${client.guilds.cache.size} server`);
  console.log(
    ` [🍻] ${environment == "development" ? "Development" : "Production"} mode`,
  );
  if (send_announce) {
    console.log(` [🍻] Announce sended`);
    announce(client);
  }
};
