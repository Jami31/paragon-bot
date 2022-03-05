const { DiscordAPIError, Message } = require("discord.js")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

const durations = [
	{ name: "60 seconds", value: 60 * 1000 },
	{ name: "5 minutes", value: 5 * 60 * 1000 },
	{ name: "10 minutes", value: 10 * 60 * 1000 },
	{ name: "30 minutes", value: 30 * 60 * 1000 },
	{ name: "1 hour", value: 60 * 60 * 1000 },
	{ name: "1 day", value: 24 * 60 * 60 * 1000 },
	{ name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
]

const run = async (client, interaction) => {
    let member = interaction.options.getMember("user")
    let duration = interaction.options.getNumber("duration")
    let reason = interaction.options.getString("reason") || "No reason given"

    const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('test')
        .setDescription('this is just a test')
        .setFooter('test');

    if (!member) return interaction.reply("You must provide a user to timeout")

    try {
        await member.timeout(duration, reason)
         return interaction.reply(

             {embeds: [newEmbed]}
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