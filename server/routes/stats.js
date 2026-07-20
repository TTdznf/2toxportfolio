const express = require("express");
const db = require("../database/database");

let onlineVisitors = 0;

const router = express.Router();

router.get("/", (req, res) => {

    db.run(`
        UPDATE stats
        SET visitors = visitors + 1
        WHERE id = 1
    `);

    db.get(`
        SELECT visitors
        FROM stats
        WHERE id = 1
    `, (err, row) => {

        if (err) {
            return res.sendStatus(500);
        }

        onlineVisitors++;

        res.json({
            visitors: row.visitors,
            online: onlineVisitors
        });

    });

});

router.post("/leave", (req, res) => {

    if (onlineVisitors > 0) {
        onlineVisitors--;
    }

    res.sendStatus(200);

});

module.exports = router;