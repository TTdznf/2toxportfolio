const DISCORD_USER_ID = "1036696647389958207";

const terminalCode = `<span class="kw">local</span> Developer = {}
Developer.__index = Developer

<span class="kw">function</span> Developer:<span class="prop">new</span>(name, role, skills, contact)
    <span class="kw">return</span> setmetatable({
        <span class="prop">name</span> = name,
        <span class="prop">role</span> = role,
        <span class="prop">skills</span> = skills,
        <span class="prop">contact</span> = contact
    }, self)
<span class="kw">end</span>

<span class="kw">local</span> 2tox = Developer:<span class="prop">new</span>(
    <span class="str">"2tox"</span>,
    <span class="str">"Web Developer"</span>,
    { <span class="str">"HTML"</span>, <span class="str">"CSS"</span>, <span class="str">"JavaScript"</span>, <span class="str">"Python"</span> },
    { <span class="prop">discord</span> = <span class="str">"2tox"</span> }
)`;
document.getElementById("terminal-code").innerHTML = terminalCode;

function avatarUrl(user) {
  if (!user?.avatar) return "https://cdn.discordapp.com/embed/avatars/0.png";
  const extension = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=256`;
}

function bannerUrl(presence) {
    const banner = presence.profile?.banner;

    if (banner) {
        const ext = banner.startsWith("a_") ? "gif" : "png";

        return `https://cdn.discordapp.com/banners/${presence.discord_user.id}/${banner}.${ext}?size=1024`;
    }

    return null;
}
// Discord's official public_flags bitmask -> real profile badges
const BADGE_FLAGS = [
    {
        flag: 1 << 0,
        label: "Discord Staff",
        icon: "/assets/badges/staff.png"
    },
    {
        flag: 1 << 1,
        label: "Discord Partner",
        icon: "/assets/badges/partner.png"
    },
    {
        flag: 1 << 2,
        label: "HypeSquad Events",
        icon: "/assets/badges/hypesquad-events.png"
    },
    {
        flag: 1 << 3,
        label: "Bug Hunter Level 1",
        icon: "/assets/badges/bughunter-1.png"
    },
    {
        flag: 1 << 6,
        label: "HypeSquad Bravery",
        icon: "/assets/badges/bravery.png"
    },
    {
        flag: 1 << 7,
        label: "HypeSquad Brilliance",
        icon: "/assets/badges/brilliance.png"
    },
    {
        flag: 1 << 8,
        label: "HypeSquad Balance",
        icon: "/assets/badges/balance.png"
    },
    {
        flag: 1 << 9,
        label: "Early Supporter",
        icon: "/assets/badges/early-supporter.png"
    },
    {
        flag: 1 << 14,
        label: "Bug Hunter Level 2",
        icon: "/assets/badges/bughunter-2.png"
    },
    {
        flag: 1 << 16,
        label: "Verified Bot",
        icon: "/assets/badges/verified-bot.png"
    },
    {
        flag: 1 << 17,
        label: "Early Verified Bot Developer",
        icon: "/assets/badges/verified-developer.png"
    },
    {
        flag: 1 << 18,
        label: "Moderator Programs Alumni",
        icon: "/assets/badges/moderator.png"
    },
    {
        flag: 1 << 22,
        label: "Active Developer",
        icon: "/assets/badges/active-developer.png"
    }
];
const BADGE_ORDER = [
    "Discord Staff",
    "Discord Partner",
    "HypeSquad Events",
    "Bug Hunter Level 1",
    "Bug Hunter Level 2",
    "HypeSquad Bravery",
    "HypeSquad Brilliance",
    "HypeSquad Balance",
    "Early Supporter",
    "Active Developer",
    "Moderator Programs Alumni",
    "Verified Bot",
    "Early Verified Bot Developer",
    "Discord Nitro"
];
function realBadges(user) {
    const flags = Number(user.public_flags ?? 0);

    return BADGE_FLAGS.filter(badge => (flags & badge.flag) !== 0);
}
let currentPresence = null;
function renderDiscordPresence(presence) {
  if (!presence?.discord_user) return;
  currentPresence = presence;
  const card = document.querySelector(".discord-card");
  const user = presence.discord_user;
  console.log(presence.profile);
  const decoration = user.avatar_decoration_data;

if (decoration?.asset) {
    const url = `https://cdn.discordapp.com/avatar-decoration-presets/${decoration.asset}.png`;

    document.querySelector(".discord-avatar-decoration").style.backgroundImage =
        `url("${url}")`;
} else {
    document.querySelector(".discord-avatar-decoration").style.backgroundImage = "";
}
  const status = ["online", "idle", "dnd", "offline"].includes(presence.discord_status) ? presence.discord_status : "offline";
const statusText = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline"
};

status.innerHTML =
    `<span class="status-dot"></span> ${statusText[data.discord_status]}`;
  const spotify = presence.spotify;
  const customActivity = presence.activities?.find(activity => activity.type === 4 && activity.state);
  const appActivity = presence.activities?.find(activity => activity.type !== 4);
  const activity = spotify ? `Listening to ${spotify.song} - ${spotify.artist}` : appActivity ? `Playing ${appActivity.name}` : customActivity?.state || "No current activity";
  card.classList.add("live-presence");
  card.classList.remove("online", "idle", "dnd", "offline");
  card.classList.add(status);
  card.style.setProperty("--discord-avatar", `url("${avatarUrl(user)}")`);
  const bannerElement = card.querySelector(".discord-banner");
const banner = bannerUrl(presence);
const guildBadge = primaryGuildBadgeUrl(user);
const guildElement = card.querySelector(".discord-guild");

if (user.primary_guild?.identity_enabled && guildBadge) {
    guildElement.innerHTML = `
        <img src="${guildBadge}" alt="">
        <span>${user.primary_guild.tag}</span>
    `;
} else {
    guildElement.innerHTML = "";
}

if (banner) {
    bannerElement.style.backgroundImage = `url("${banner}")`;
    bannerElement.style.backgroundColor = "";
} else if (presence.profile?.hexAccentColor) {
    bannerElement.style.backgroundImage = "";
    bannerElement.style.backgroundColor = presence.profile.hexAccentColor;
} else {
    bannerElement.style.backgroundImage = "";
    bannerElement.style.backgroundColor = "#5865F2";
}

bannerElement.style.backgroundSize = "cover";
bannerElement.style.backgroundPosition = "center";
  card.querySelector(".discord-banner").style.backgroundSize = "cover";
  card.querySelector(".discord-banner").style.backgroundPosition = "center";
  card.setAttribute("aria-label", `${user.global_name || user.display_name || user.username}: ${statusLabels[status]}. ${activity}`);
  card.querySelector(".discord-avatar").firstChild.textContent = "";
  card.querySelector(".discord-details strong").textContent = user.global_name || user.display_name || user.username;
  card.querySelector(".discord-details small").innerHTML = `<span class="status-dot ${status}"></span>${statusLabels[status]} - ${activity}`;
  const badges = realBadges(user);
  if (presence.profile?.nitro) {
    badges.unshift({
        label: "Discord Nitro",
        icon: "/assets/badges/nitro-Abzeichen.png"
    });
    badges.sort((a, b) => {
    const indexA = BADGE_ORDER.indexOf(a.label);
    const indexB = BADGE_ORDER.indexOf(b.label);

    return (
        (indexA === -1 ? 999 : indexA) -
        (indexB === -1 ? 999 : indexB)
    );
});
}
  console.log("Flags:", user.public_flags);
  console.log("Badges:", badges);
 const badgeHtml = badges.map(badge => `
<div class="discord-badge-wrapper">
    <img
        class="discord-badge"
        src="${badge.icon}"
        alt="${badge.label}"
    >

    <div class="discord-tooltip">
        ${badge.label}
    </div>
</div>
`).join("");
  const liveTag = `<span title="${spotify ? "Listening on Spotify" : "Live presence"}">${spotify ? "♪" : "●"}</span>`;
  card.querySelector(".discord-badges").innerHTML = badgeHtml + liveTag;
}
function showDiscordUnavailable() {
    const card = document.querySelector(".discord-card");
    card.classList.add("live-presence", "offline");
    card.querySelector(".discord-details strong").textContent = "Discord";
    card.querySelector(".discord-details small").innerHTML =
        '<span class="status-dot offline"></span>Lanyard not connected';
    card.querySelector(".discord-badges").innerHTML = "<span>OFFLINE</span>";
}
async function getDiscordPresence() {
    try {

        const response = await fetch("/api/profile");

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        const profile = await response.json();

        console.log(profile);

        renderDiscordPresence(profile);

    } catch (err) {

        console.error(err);

        showDiscordUnavailable();

    }
}
async function getDiscordPresence() {
    try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        const profile = await response.json();

        console.log(profile);

        renderDiscordPresence(profile);

    } catch (err) {
        console.error(err);
        showDiscordUnavailable();
    }
}
function connectDiscordPresence() {
  let heartbeat;
  const socket = new WebSocket("wss://api.lanyard.rest/socket");
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (message.op === 1) {
      heartbeat = window.setInterval(() => socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify({ op: 3 })), message.d.heartbeat_interval);
      socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }));
    }
    if (message.op !== 0) return;
    if (message.t === "INIT_STATE") renderDiscordPresence(message.d?.[DISCORD_USER_ID]);
    if (message.t === "PRESENCE_UPDATE" && message.d?.user_id === DISCORD_USER_ID) renderDiscordPresence(message.d);
  });
  socket.addEventListener("close", () => { window.clearInterval(heartbeat); window.setTimeout(connectDiscordPresence, 5000); });
  socket.addEventListener("error", () => socket.close());
}
getDiscordPresence();
connectDiscordPresence();
function primaryGuildBadgeUrl(user) {
    const guild = user.primary_guild;

    if (!guild?.badge) return null;

    return `https://cdn.discordapp.com/guild-tag-badges/${guild.identity_guild_id}/${guild.badge}.png?size=64`;
}
// ===============================
// Discord Profile Popup
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".discord-card");
    const overlay = document.querySelector(".discord-profile-overlay");

    if (!card || !overlay) {
        console.warn("Discord Popup: Elemente nicht gefunden.");
        return;
    }

    card.addEventListener("click", () => {

    if (!currentPresence) return;

    const user = currentPresence.discord_user;

    const banner = bannerUrl(currentPresence);
    overlay.querySelector(".profile-banner").style.backgroundImage =
        banner ? `url("${banner}")` : "";

    overlay.querySelector(".profile-avatar").style.backgroundImage =
        `url("${avatarUrl(user)}")`;

    const decoration = user.avatar_decoration_data;

    overlay.querySelector(".profile-decoration").style.backgroundImage =
        decoration?.asset
            ? `url("https://cdn.discordapp.com/avatar-decoration-presets/${decoration.asset}.png")`
            : "";

    overlay.querySelector(".profile-name").textContent =
        user.global_name || user.username;

    overlay.querySelector(".profile-username").textContent =
        "@" + user.username;

    const popupBadges = [...realBadges(user)];

    if (currentPresence.profile?.nitro) {
        popupBadges.unshift({
            label: "Discord Nitro",
            icon: "/assets/badges/nitro-Abzeichen.png"
        });
    }

    popupBadges.sort((a, b) => {
        const indexA = BADGE_ORDER.indexOf(a.label);
        const indexB = BADGE_ORDER.indexOf(b.label);

        return (indexA === -1 ? 999 : indexA) -
               (indexB === -1 ? 999 : indexB);
    });

    overlay.querySelector(".profile-badges").innerHTML =
        popupBadges.map(badge => `
            <div class="discord-badge-wrapper">
                <img
                    class="discord-badge"
                    src="${badge.icon}"
                    alt="${badge.label}"
                >
                <div class="discord-tooltip">
                    ${badge.label}
                </div>
            </div>
        `).join("");

    const status = currentPresence.discord_status || "offline";
    overlay.querySelector(".profile-status").className =
        `profile-status ${status}`;

    const activity =
    currentPresence.spotify ||
    currentPresence.activities?.find(a => a.type !== 4);

const image = overlay.querySelector(".activity-image");
const smallImage = overlay.querySelector(".activity-small-image");

console.log({
    image,
    smallImage,
    overlay
});
const title =
    overlay.querySelector(".activity-title");

const details =
    overlay.querySelector(".activity-details");

const state =
    overlay.querySelector(".activity-state");

if (currentPresence.spotify) {

    image.hidden = false;
    image.src = currentPresence.spotify.album_art_url;

    smallImage.hidden = true;

    title.textContent = currentPresence.spotify.song;
    details.textContent = currentPresence.spotify.artist;
    state.textContent = currentPresence.spotify.album;

}
else if (activity) {

    const applicationId = activity.application_id;

    if (activity.assets?.large_image && applicationId) {

        image.hidden = false;

        image.src =
            `https://cdn.discordapp.com/app-assets/${applicationId}/${activity.assets.large_image}.png`;

    } else {

        image.hidden = true;
    }

    if (activity.assets?.small_image && applicationId) {

        smallImage.hidden = false;

        smallImage.src =
            `https://cdn.discordapp.com/app-assets/${applicationId}/${activity.assets.small_image}.png`;

    } else {

        smallImage.hidden = true;
    }

    title.textContent = activity.name;
    details.textContent = activity.details || "";
    state.textContent = activity.state || "";

}
else {

    image.hidden = true;
    smallImage.hidden = true;

    title.textContent = "No activity";
    details.textContent = "";
    state.textContent = "";
}
const created = new Date(
    Number((BigInt(user.id) >> 22n) + 1420070400000n)
);

overlay.querySelector(".profile-member-since").textContent =
    created.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    overlay.hidden = false;
});

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.hidden = true;
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            overlay.hidden = true;
        }
    });
});