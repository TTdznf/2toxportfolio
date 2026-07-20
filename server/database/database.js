const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "../../portfolio.db"),
    (err) => {
        if (err) {
            console.error("❌ Datenbankfehler:", err);
        } else {
            console.log("✅ SQLite verbunden");
        }
    }
);

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS stats (
            id INTEGER PRIMARY KEY,
            visitors INTEGER DEFAULT 0
        )
    `);

    db.run(`
        INSERT OR IGNORE INTO stats(id, visitors)
        VALUES (1, 0)
    `);

});

module.exports = db;