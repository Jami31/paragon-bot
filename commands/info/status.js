module.exports = {
    name: 'status',
    description: 'changes the bots status!',
    execute(client,message, args) {
        if (message.author.id !== '948456447560257576') return;

        if (!args[0]) return message.channel.send('Please provide an activity!')

        if (!args[1]) return message.channel.send('Please provide a status!');

        const content = args.slice(1).join(' ');
        const type = args[0].toUpperCase();

        client.user.setPresence({
            activity: {
                name: content,
                type: type
            }
        })
        message.channel.send('Done!')
    }
}