export const checkRolePos = (interaction, target, name) => {
  const client = interaction.client.user.id;

  // Pastikan client memiliki peran dengan nama yang diberikan
  const clientRole = interaction.guild.members.cache
    .get(client)
    .roles.cache.find((r) => r.name === name);

  // Jika client tidak memiliki role yang dimaksud, kembalikan false
  if (!clientRole) {
    console.log(`Client tidak memiliki role dengan nama ${name}`);
    return false;
  }

  const target_pos = target.rawPosition;
  const client_pos = clientRole.rawPosition;

  // Pastikan target memiliki role yang memiliki rawPosition
  if (typeof target_pos === "undefined") {
    console.log("Target tidak memiliki rawPosition");
    return false;
  }

  if (client_pos > target_pos) {
    return true;
  } else {
    return false;
  }
};
