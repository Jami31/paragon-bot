module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log("Logged in as " + bot.client.user.tag);
        client.user.setPresence({
            activity: {
                name: `${serverIn} servers.`,
                type: "WATCHING"
            },
            status: `dnd`
        })
        .catch(console.error);
    }
}