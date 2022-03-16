const Canvas = require ("canvas")
const Discord = require("discord.js")
const background = "https://i.postimg.cc/dVSpq0PH/frfrwelcome.png"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

const dim = {
    height: 559,
    width: 1298,
    margin: 50
}

const av = {
    size: 256,
    x: 500,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canvas.loadImage(background) 

    ctx.drawImage(backimg, 0, 0)

    // // draw black tinted box
    // ctx.fillStyle = "rgba(0,0,0,0.7)"
    // ctx.fillRect(0,0,1200,675)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // // write in text
    // ctx.fillStyle = "white"
    // ctx.textAlign = "center"

    // // draw in Welcomg
    // ctx.font = "70px BankGothic Md BT"
    // ctx.fillText("W E L C O M E", dim.width/2, dim.margin + 70)

    // // draw in the username
    // ctx.font = "60px BankGothic Md BT"
    // ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin - 125)
 
    // // draw in to the server
    // ctx.font = "40px BankGothic Md BT"
    // ctx.fillText("T O  P A R A G O N", dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment


}

module.exports = generateImage

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
        .attachFiles(attachment)

          member.guild.channels.cache.get(welcomeChannelId).send({
          embeds: [welcomeEmbed]
     })
 })