import { AttachmentBuilder } from "discord.js";
import { request } from "undici";
import { join } from "path";
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import prisma from "./../libs/prisma.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const __dirname = import.meta.dirname;

export const welcomerPreview = async (interaction) => {
  function formater(str) {
    let replacer = {
      "{user}": `<@${interaction.user.id}>`,
      "{user.username}": interaction.user.username,
      "{server.name}": interaction.guild.name,
      "{membercount}": interaction.guild.memberCount,
    };
    return str.replaceAll(
      /{membercount}|{server.name}|{user}|{user.username}/gi,
      function (match) {
        return replacer[match];
      },
    );
  }

  function isUriImage(uri) {
    uri = uri.split("?")[0];
    var parts = uri.split(".");
    var extension = parts[parts.length - 1];
    var imageTypes = ["jpg", "jpeg", "tiff", "png", "gif", "bmp"];
    if (imageTypes.indexOf(extension) !== -1) {
      return true;
    }
  }

  function applyText(canvas, text, initial, font) {
    const context = canvas.getContext("2d");
    let fontSize = initial;
    do {
      context.font = `${(fontSize -= 10)}px ${font}`;
    } while (context.measureText(text).width > canvas.width - 100);
    return context.font;
  }

  const serverWelcomer = await prisma.welcomer.findFirst({
    where: { server_id: interaction.guild.id },
  });
  if (!serverWelcomer)
    return await interaction.reply(
      "`🍻` No welcomer set up\n" +
        "`🍻` Use `/welcomer setting` to set welcomer",
    );

  if (!serverWelcomer.enabled)
    return await interaction.reply(
      "`🍻` Welcomer is disabled\n" +
        "`🍻` Use `/welcomer toggle` to enable welcomer",
    );

  await interaction.deferReply();
  const target = interaction.user;
  const image = serverWelcomer.image;
  const userAvatar = target.displayAvatarURL();
  const userName = target.tag;
  const color = serverWelcomer.color ? serverWelcomer.color : "#ffffff";
  const shadow = serverWelcomer.shadow ? 25 : 0;
  const message = serverWelcomer.message
    ? formater(serverWelcomer.message)
    : serverWelcomer.message;
  const greeting = serverWelcomer.greeting
    ? formater(serverWelcomer.greeting)
    : "WELCOME";
  const greeting_msg = serverWelcomer.greeting_msg
    ? formater(serverWelcomer.greeting_msg)
    : formater('"welcome to {server.name}"');

  GlobalFonts.registerFromPath(
    join(__dirname, "..", "fonts", "discord.otf"),
    "Discord",
  );
  GlobalFonts.registerFromPath(
    join(__dirname, "..", "fonts", "saeda.otf"),
    "Saeda",
  );
  const canvas = createCanvas(1024, 500);
  const context = canvas.getContext("2d");

  // BACKGROUND
  if (image && isUriImage(image)) {
    const background = await loadImage(image);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
  }

  const circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 126,
  };

  if (color.startsWith("#")) {
    context.fillStyle = color;
    context.strokeStyle = color;
  } else {
    context.fillStyle = `#${color}`;
    context.strokeStyle = `#${color}`;
  }

  context.shadowBlur = shadow;
  context.shadowColor = "black";

  // GREETING
  context.font = applyText(canvas, greeting, 80, "Discord");
  const greetingWidth = context.measureText(greeting).width / 2;
  context.fillText(greeting, circle.x - greetingWidth, circle.y + 124);

  // NAME
  context.font = applyText(canvas, userName, 50, "Discord");
  const nameWidth = context.measureText(userName).width / 2;
  context.fillText(userName, circle.x - nameWidth, circle.y + 170);

  // GREETING MSG
  context.font = applyText(canvas, greeting_msg, 50, "Saeda");
  const greetingMsgWidth = context.measureText(greeting_msg).width / 2;
  context.fillText(greeting_msg, circle.x - greetingMsgWidth, circle.y + 210);

  // AVATAR
  context.lineWidth = 14;
  context.beginPath();
  context.arc(circle.x, circle.y - 80, circle.r, 0, Math.PI * 2, true);
  context.stroke();
  context.closePath();
  context.clip();

  const { body } = await request(userAvatar);
  const avatar = await loadImage(await body.arrayBuffer());

  const aspect = avatar.height / avatar.width;
  const hsx = circle.r * Math.max(1.0 / aspect, 1.0);
  const hsy = circle.r * Math.max(aspect, 1.0);
  context.drawImage(
    avatar,
    circle.x - hsx,
    circle.y - hsy - 80,
    hsx * 2,
    hsy * 2,
  );

  const attachment = new AttachmentBuilder(await canvas.encode("png"), {
    name: "welcomer.png",
  });

  await interaction.editReply({ content: message, files: [attachment] });
};
