const Discord = require("discord.js")
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
 })

 const welcomeChannelId = "948138787391799306"

 client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
          member.guild.channels.cache.get(welcomeChannelId).send({
          content: `Hey <@${member.id}>, On behalf of the whole department, welcome onboard! We believe you will be a terrific asset to Roleplayer's Paragon!`,
          files: [img]
     })
 })
client.login(process.env.TOKEN)