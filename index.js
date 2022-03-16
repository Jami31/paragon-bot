const { DiscordAPIError, Message } = require("discord.js")

const Discord = require("discord.js")

const Canvas = require("canvas")

require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "daddy",
    owners: ["653363136002523158"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)

module.exports = bot

 client.on("ready", () => {
     console.log(`Logged in as ${client.user.tag}`)
 })

 client.on("messageCreate", (message) => {
    if (message.content == "daddy cheer mo ko") {
        message.reply("no")
    }
    if (message.content == "daddy maganda ba ko") {
        message.reply("no")
    }
    if (message.content == "daddy pogi ba si jami") {
        message.reply("yes")
    }
    if (message.content == "@Jami |🦷") {
        message.reply("Busy si master")
    }
 })

 const welcomeChannelId = "948138787391799306"

 client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)

    const welcomeEmbed = new Discord.MessageEmbed()
        .setAuthor("Paragon", client.user.displayAvatarURL())
        .setColor('#2f3136')
        .setTitle('Welcome!')
        .setDescription(`Heyyy~ <@${member.id}>, On behalf of the whole \ndepartment,welcome onboard! We believe\n you will bea terrific asset to Roleplayer's Paragon!\n`)
        .setTimestamp()
        .setFooter({ text: 'Welcome'})
        .setThumbnail(client.user.displayAvatarURL())
        .setImage("attachment://welcome.png")

          member.guild.channels.cache.get(welcomeChannelId).send({
          embeds: [welcomeEmbed]
     })
 })

client.login(process.env.TOKEN)