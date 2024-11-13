import "dotenv/config";
import { Colors, EmbedBuilder } from "discord.js";
import { footer } from "../config.js";

export const userInfo = async (interaction) => {
  const embed = new EmbedBuilder();
  let user;
  if (interaction.options.getUser("user")) {
    user = interaction.options.getUser("user");
  } else {
    user = interaction.user;
  }

  let banner, name, id, username, avatar, born, joined;

  await user
    .fetch(true)
    .then((fetchedUser) => {
      banner = fetchedUser.bannerURL({ size: 1024 });
    })
    .catch((e) => console.log(e));

  name = user.globalName;
  username = user.username;
  id = user.id;
  avatar = user.displayAvatarURL({ size: 1024 });

  born = new Date(user.createdTimestamp);
  var age = Math.floor((new Date() - born) / 31536000000);

  joined = await interaction.guild.members
    .fetch(id)
    .then((res) => res.joinedTimestamp)
    .catch((e) => console.log(e));
  joined = new Date(joined).toUTCString();

  await interaction.reply({
    embeds: [
      embed
        .setAuthor({ name: `User Information ${username}`, iconURL: avatar })
        .setThumbnail(avatar)
        .setDescription("`🌻` " + `<@${id}>`)
        .setFields(
          { name: " ", value: " " },
          {
            name: "`👑` **NICKNAME**",
            value: "`👑` " + (name ? name : username),
            inline: true,
          },
          { name: "`🆔` **USER ID**", value: "`🆔` " + id, inline: true },
          { name: " ", value: " " },
          {
            name: "`📅` **BORN**",
            value:
              "`📅` `" + born.toUTCString() + " | " + age + " year(s) ago`",
          },
          { name: " ", value: " " },
          {
            name: "`🚧` **JOINED**",
            value: "`🚧` `" + joined + "`",
          },
          { name: " ", value: " " },
          {
            name: `${banner ? "`📷` **BANNER**" : " "}`,
            value: " ",
          },
        )
        .setImage(banner)
        .setFooter({
          text: footer,
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .setColor(Colors.Gold),
    ],
  });
};
