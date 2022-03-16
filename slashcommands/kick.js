const run = async (client, interaction) => {
	let user = interaction.options.getUser("user")
	let reason = interaction.options.getString("reason") || "No reason given"

	const kickedEmbed = new Discord.MessageEmbed()
        .setAuthor(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor('#2f3136')
        .setTitle('Kicked')
        .setDescription(`${member.user} has been kicked out for \n ***${reason}***`)
        .setTimestamp()
        .setFooter({ text: 'Kicked'})
        .setThumbnail(client.user.displayAvatarURL())

	if (!user) return interaction.reply("You must provide a user to kick")

	// kicked
	try {
		await interaction.guild.members.kick(user, reason)
		return interaction.reply(
            {embeds: [kickedEmbed]}
		 	
		 )
	} catch (e) {
		if (e) {
			console.error(e)
			return interaction.reply(`Failed to kick ${user.tag}`)
		}
	}
}

module.exports = {
	name: "kick",
	description: "Kicks a user from the server.",
	perms: "KICK_MEMBERS",
	options: [
		{ name: "user", description: "The user to kick.", type: "USER", required: true },
		{
			name: "reason",
			description: "reason for the punishment.",
			type: "STRING",
			required: false,
		},
	],
	run,
}