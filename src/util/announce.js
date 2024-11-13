export const announce = (client) => {
  const channel = client.channels.cache.get("1096004905761775656");
  channel.send(
    "<a:gunungan:1096043083696701570> **[UPDATE]**" +
      "\n<a:awan:1096044586213851177> [SEMVR](https://discord.gg/g4AzF5FvHH) is back in orbit and is currently in beta status with the use of a new framework for our bot optimization." +
      "\n`Some of the features that you can use now are` :" +
      "```" +
      "/user\n" +
      "  ├─ info\n" +
      "  ├─ avatar\n" +
      "  └─ banner\n" +
      "/server\n" +
      "  ├─ info\n" +
      "  └─ icon\n" +
      "/ping\n" +
      "```" +
      "For more information, join the official [SEMVR](https://discord.gg/g4AzF5FvHH) discord server",
  );
};
