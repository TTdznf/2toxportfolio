require("dotenv").config();
require("./database/database");

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const {
    Client,
    GatewayIntentBits
} = require("discord.js");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const USER_ID = "1036696647389958207";

client.once("clientReady", async () => {
    console.log(`✅ Bot gestartet als ${client.user.tag}`);

    try {
        const user = await client.users.fetch(USER_ID, {
    force: true
});

console.log({
    id: user.id,
    username: user.username,
    banner: user.banner,
    accentColor: user.accentColor,
    hexAccentColor: user.hexAccentColor
});

console.log("Bot Flags:", user.flags?.toArray());
console.log("Bitfield:", user.flags?.bitfield);
    } catch (err) {
        console.error(err);
    }
});
console.log("DISCORD_TOKEN:", process.env.DISCORD_TOKEN ? "gefunden" : "NICHT gefunden");
client.login(process.env.DISCORD_TOKEN);

const profileRoute = require("./routes/profile");
const statsRoute = require("./routes/stats");

app.use("/api/profile", profileRoute(client, USER_ID));
app.use("/api/stats", statsRoute);
io.on("connection", (socket) => {

    console.log("🟢 Verbunden:", socket.id);

    socket.on("disconnect", () => {
        console.log("🔴 Getrennt:", socket.id);
    });

});

server.listen(3001, () => {
    console.log("🚀 API läuft auf http://localhost:3001");
});