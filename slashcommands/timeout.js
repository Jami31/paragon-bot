const { DiscordAPIError, Message } = require("discord.js")
const Discord = require("discord.js")

const durations = [
	{ name: "60 seconds", value: 60 * 1000 },
	{ name: "5 minutes", value: 5 * 60 * 1000 },
	{ name: "10 minutes", value: 10 * 60 * 1000 },
	{ name: "30 minutes", value: 30 * 60 * 1000 },
	{ name: "1 hour", value: 60 * 60 * 1000 },
	{ name: "1 day", value: 24 * 60 * 60 * 1000 },
	{ name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
]

const run = async (client, interaction, message) => {
    let member = interaction.options.getMember("user")
	let duration = interaction.options.getNumber("duration")
	let reason = interaction.options.getString("reason") || "No reason given"

    const timeoutEmbed = new Discord.MessageEmbed()
        .setAuthor(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor('#2f3136')
        .setTitle('Timeout')
        .setDescription(`${member.user} has been timed out for ${durations.find((d) => duration === d.value)?.name} \n with a reason of ***${reason}***`)
        .setTimestamp()
        .setFooter({ text: 'Timeout'})
        .setThumbnail(client.user.displayAvatarURL())

	if (!member) return interaction.reply("You must provide a user to timeout")

	try {
		await member.timeout(duration, reason)
		 return interaction.reply(
            {embeds: [timeoutEmbed]}
		 	
		 )
	} catch (e) {
		if (e) {
			console.error(e)
			return interaction.reply(`Failed to timeout ${member.tag}`)
		}
	}
}

module.exports = {
    name: "timeout",
    description: "Timeout a member",
    perm: "MODERATE_MEMBERS",
    options: [
        {
            name: "user", description: "The user to timeout",
            type: "USER", required: true
        },
        {
            name: "duration",
            description: "The duration of the timeout",
            type: "NUMBER",
            choices: durations,
            require: true
        },
        {
            name: "reason",
            description: "reason for punishment",
            type: "STRING",
            require: false
        }
    ], run
}