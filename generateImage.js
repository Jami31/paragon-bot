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

client.on("generateImage", async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canvas.loadImage(background) 

    ctx.drawImage(backimg, 0, 0)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    const welcomeChannelId = "948138787391799306"
   
       const welcomeEmbed = new Discord.MessageEmbed()

           .setAuthor("Paragon", client.user.displayAvatarURL())
           .setColor('#2f3136')
           .setTitle('Welcome!')
           .setDescription(`Heyyy~ <@${member.id}>, On behalf of the whole \ndepartment,welcome onboard! We believe\n you will bea terrific asset to Roleplayer's Paragon!\n`)
           .setTimestamp()
           .setFooter({ text: 'Welcome'})
           .setThumbnail(client.user.displayAvatarURL())
           .setImage(`attachment://welcome.png`)
           .attachFiles(attachment)
   
           member.guild.channels.cache.get(welcomeChannelId).send({
            embeds: [welcomeEmbed]
        })
})