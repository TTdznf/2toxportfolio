const socket = io();
socket.on("connect", () => {
    console.log("🟢 Mit Socket.IO verbunden:", socket.id);
});
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];


const enter = $("#enter-screen");
$("#enter-button").addEventListener("click", () => {
  enter.classList.add("hidden");
  window.setTimeout(() => enter.remove(), 950);
});

const roles = ["2tox"];
const roleTarget = $("#role-type");
let roleIndex = 0;
let roleChar = roles[0].length;
let deleting = false;
function typeRole() {
  const word = roles[roleIndex];
  roleTarget.textContent = word.slice(0, roleChar);
  if (!deleting && roleChar === word.length) {
    deleting = true;
    setTimeout(typeRole, 1300);
    return;
  }
  if (deleting && roleChar === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 250);
    return;
  }
  roleChar += deleting ? -1 : 1;
  setTimeout(typeRole, deleting ? 45 : 88);
}
setTimeout(typeRole, 1300);

const header = $("#site-header");
const progress = $("#scroll-progress");
const navLinks = $$(".nav-links a");
const toTop = $("#to-top");
const menu = $("#menu-toggle");
const nav = $("#nav-links");
function updateScrollUi() {
  const top = window.scrollY;
  const full = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (top / Math.max(full, 1)) * 100)}%`;
  header.classList.toggle("scrolled", top > 48);
  toTop.classList.toggle("visible", top > 700);
  const marker = top + window.innerHeight * .35;
  let active = "hero";
  ["hero", "about", "skills", "services"].forEach(id => {
    const section = document.getElementById(id);
    if (section && marker >= section.offsetTop) active = id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${active}`));
}
window.addEventListener("scroll", updateScrollUi, { passive: true });
window.addEventListener("resize", updateScrollUi);
updateScrollUi();

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
});
navLinks.forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menu.classList.remove("open"); menu.setAttribute("aria-expanded", "false");
}));
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("in-view"); });
}, { threshold: .12 });
$$(".reveal").forEach(element => revealObserver.observe(element));

const stats = $("#stats");
let counted = false;
const counterObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || counted) return;
  counted = true;
  $$("[data-count]").forEach(node => {
    const end = Number(node.dataset.count);
    const start = performance.now();
    const draw = now => {
      const pct = Math.min(1, (now - start) / 1200);
      node.textContent = Math.floor(end * (1 - Math.pow(1 - pct, 3))).toLocaleString();
      if (pct < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  });
}, { threshold: .4 });
counterObserver.observe(stats);

const serviceData = {
  fivem: { title: "Website Development", description: "With extensive experience in modern web development, I build custom websites tailored to your business goals from responsive design to technical performance.", details: ["Custom-built websites tailored to your business goals", "Responsive design for optimal display across all devices", "High-performance, fast load times through optimized code", "Modern frameworks & technologies (React, Next.js, etc.)", "Scalable architecture built for future growth", "SEO-friendly structure from the ground up"] },
  altv: { title: "Website Editing & Maintenance", description: "Maintaining and optimizing existing websites, I provide reliable, up-to-date solutions tailored to keep your site secure, fast, and running smoothly.",details: ["Regular updates & maintenance for existing websites","Bug fixing and resolution of technical issues","Security updates to protect against vulnerabilities and attacks","Performance optimization for faster load times","Content updates & design adjustments as needed","Ongoing technical support and monitoring"] },
  discord: { title: "Online Marketing & SEO", description: "Building and executing targeted SEO and marketing strategies, I provide data-driven solutions tailored to your business goals and help turn visitors into customers.",details: ["Comprehensive SEO analysis and on-page optimization","Keyword research and content strategy development","Technical SEO improvements (load times, structure, meta data)","Local SEO strategies for better regional visibility","Performance tracking and detailed reporting","Digital marketing strategies focused on customer acquisition"] }
};
const detailsModal = $("#details-modal");
const contactModal = $("#contact-modal");
function openModal(modal) { document.body.classList.add("modal-open"); modal.showModal(); }
function closeModal(modal) { modal.close(); document.body.classList.remove("modal-open"); }
$$(".open-service").forEach(button => button.addEventListener("click", () => {
  const service = serviceData[button.dataset.service];
  $("#modal-title").textContent = service.title;
  $("#modal-description").textContent = service.description;
  $("#modal-list").innerHTML = service.details.map(item => `<li>${item}</li>`).join("");
  openModal(detailsModal);
}));
$("#contact-fab").addEventListener("click", () => openModal(contactModal));
$$(".modal-close").forEach(button => button.addEventListener("click", () => closeModal(button.closest("dialog"))));
[detailsModal, contactModal].forEach(modal => modal.addEventListener("click", event => { if (event.target === modal) closeModal(modal); }));

const tracks = [
  { title: "Heavy stunts", artist: "Yeat, Don Toliver", image: "https://i.scdn.co/image/ab67616d0000b2730bfefb7db8bca7277822d0f3", src: "audio/glamorous.mp3" },
  { title: "Geist", artist: "OG Keemo", image: "https://i.scdn.co/image/ab67616d0000b2732a135808915566038569c13d", src: "audio/geist.mp3" },
  { title: "PENNY", artist: "reezy, Hamza", image: "https://i.scdn.co/image/ab67616d0000b2735f8b4df12e882d4a6c96e57a", src: "audio/PENNY.mp3" },
  { title: "9K", artist: "Tom Hengst, OG Keemo", image: "https://i.scdn.co/image/ab67616d0000b27313b990079768f0ac167e7875", src: "audio/9K.mp3" },
  { title: "Bundeswehr", artist: "Souly", image: "https://i.scdn.co/image/ab67616d0000b273d028e780f39b4297f9411fb6", src: "audio/Bundeswehr.mp3" },
  { title: "Florenz", artist: "Pashanim", image: "https://i.scdn.co/image/ab67616d0000b27333ff34130a6eeecb47d24d26", src: "audio/Florenz.mp3" },
  { title: "Tartan", artist: "EsDeeKid, Fimiguerrero", image: "https://i.scdn.co/image/ab67616d0000b273b340c3c62478b6961d7f3c34", src: "audio/Tartan.mp3" }
];
let trackIndex = 6;
let isPlaying = false;
const trackAudio = $("#track-audio");

function renderTrack(autoplay = false) {
  const track = tracks[trackIndex];
  const cover = $("#album-cover");
  cover.style.opacity = .25;
  setTimeout(() => { cover.src = track.image; cover.alt = `${track.title} album cover`; cover.style.opacity = 1; }, 160);
  $("#track-title").textContent = track.title;
  $("#track-artist").textContent = track.artist;
  $("#track-progress").style.width = "0%";
  trackAudio.src = track.src;
  if (autoplay) {
    trackAudio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  } else {
    setPlaying(false);
  }
}
function setPlaying(next) {
  isPlaying = next;
  $("#play-track").textContent = isPlaying ? "Ⅱ" : "▶";
  $("#play-track").setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  if (isPlaying) trackAudio.play(); else trackAudio.pause();
}
$("#play-track").addEventListener("click", () => setPlaying(!isPlaying));
$("#next-track").addEventListener("click", () => { trackIndex = (trackIndex + 1) % tracks.length; renderTrack(true); });
$("#previous-track").addEventListener("click", () => {
  if (trackAudio.currentTime > 3) { trackAudio.currentTime = 0; return; }
  trackIndex = (trackIndex - 1 + tracks.length) % tracks.length; renderTrack(true);
});
trackAudio.addEventListener("timeupdate", () => {
  if (trackAudio.duration) $("#track-progress").style.width = `${(trackAudio.currentTime / trackAudio.duration) * 100}%`;
});
trackAudio.addEventListener("ended", () => { trackIndex = (trackIndex + 1) % tracks.length; renderTrack(true); });
$("#volume").addEventListener("input", event => { trackAudio.volume = event.target.value / 100; });
trackAudio.volume = 1;
renderTrack(false);

const canvas = $("#particles");
const ctx = canvas.getContext("2d");
let particles = [];
let pointer = { x: -200, y: -200 };
function resetCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  const number = Math.min(85, Math.max(30, Math.floor(window.innerWidth * window.innerHeight / 19000)));
  particles = Array.from({ length: number }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38, radius: Math.random() * 1.4 + .55 }));
}
function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle, index) => {
    particle.x += particle.vx; particle.y += particle.vy;
    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
    const distanceToPointer = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);
    if (distanceToPointer < 130) { particle.vx += (particle.x - pointer.x) / 50000; particle.vy += (particle.y - pointer.y) / 50000; }
    ctx.beginPath(); ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2); ctx.fillStyle = "rgba(0,155,255,.68)"; ctx.fill();
    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j]; const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 105) { ctx.beginPath(); ctx.moveTo(particle.x, particle.y); ctx.lineTo(other.x, other.y); ctx.strokeStyle = `rgba(0,128,255,${.18 * (1 - distance / 105)})`; ctx.lineWidth = .6; ctx.stroke(); }
    }
  });
  requestAnimationFrame(drawParticles);
}
resetCanvas(); drawParticles();
window.addEventListener("resize", resetCanvas);
window.addEventListener("pointermove", event => { pointer = { x: event.clientX, y: event.clientY }; });
if (matchMedia("(pointer:fine)").matches) {
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  window.addEventListener("pointermove", event => { dot.style.left = `${event.clientX}px`; dot.style.top = `${event.clientY}px`; ring.style.left = `${event.clientX}px`; ring.style.top = `${event.clientY}px`; });
  $$("a,button,input").forEach(element => { element.addEventListener("pointerenter", () => ring.classList.add("hovering")); element.addEventListener("pointerleave", () => ring.classList.remove("hovering")); });
}
const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX+"px";
    glow.style.top = e.clientY+"px";

});
document.querySelectorAll(".glass-panel").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX-rect.left;
        const y = e.clientY-rect.top;

        const rx = -(y-rect.height/2)/15;
        const ry = (x-rect.width/2)/15;

        card.style.transform =
            `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    });

});
for(let i=0;i<120;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"vw";
    star.style.top=Math.random()*100+"vh";

    star.style.animationDelay=Math.random()*5+"s";

    document.body.appendChild(star);

}
document.addEventListener("mousemove",(e)=>{

    const dot=document.createElement("span");

    dot.className="trail";

    dot.style.left=e.clientX+"px";
    dot.style.top=e.clientY+"px";

    document.body.appendChild(dot);

    setTimeout(()=>dot.remove(),700);

});
window.addEventListener("scroll",()=>{

    document.querySelectorAll(".hero-orb").forEach((orb,i)=>{

        orb.style.transform=
            `translateY(${window.scrollY*(0.1+i*0.05)}px)`;

    });

});
document.querySelectorAll(".glass-panel").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const r=card.getBoundingClientRect();

const x=(e.clientX-r.left)/r.width-.5;
const y=(e.clientY-r.top)/r.height-.5;

card.style.transform=`
perspective(1200px)
rotateY(${x*20}deg)
rotateX(${-y*20}deg)
translateY(-8px)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});
const visitor = document.getElementById("visitor-count");

let value = 0;
const target = 13847;

const interval = setInterval(()=>{

    value += Math.ceil((target-value)/20);

    visitor.textContent = value.toLocaleString();

    if(value >= target){

        visitor.textContent = target.toLocaleString();
        clearInterval(interval);

    }

},30);
async function loadStats(){

    const res = await fetch("/api/stats");
    const data = await res.json();

    document.getElementById("visitor-count").textContent =
        data.visitors.toLocaleString();

    document.getElementById("online-users").textContent =
        `${data.online} Online`;

}

loadStats();

window.addEventListener("beforeunload", () => {

   navigator.sendBeacon("/api/stats/leave");

});
// ===============================
// Discord Profile Popup
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const discordCard = document.querySelector(".discord-card");
    const overlay = document.querySelector(".discord-profile-overlay");

    if (!discordCard || !overlay) {
        console.warn("Discord Popup: Elemente nicht gefunden.");
        return;
    }

    discordCard.addEventListener("click", () => {
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
let totalVisitors = 0;
let onlineVisitors = 0;