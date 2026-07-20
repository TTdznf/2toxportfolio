const express = require("express");
const axios = require("axios");

module.exports = (client, USER_ID) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const { data } = await axios.get(
                `https://api.lanyard.rest/v1/users/${USER_ID}`
            );

            const user = await client.users.fetch(USER_ID, {
                force: true
            });

            res.json({
                ...data.data,

                discord_user: {
                    ...data.data.discord_user,
                    public_flags:
                        user.flags?.bitfield ??
                        data.data.discord_user.public_flags
                },

                profile: {
                    banner: user.banner,
                    accentColor: user.accentColor,
                    hexAccentColor: user.hexAccentColor,
                    nitro: "TEST123"
                }
            });

        } catch (err) {
            console.error(err);

            res.status(500).json({
                success: false
            });
        }
    });

    return router;
};