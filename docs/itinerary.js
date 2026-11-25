const screens = Array.from(document.querySelectorAll(".trip-day"));
const dateLinks = Array.from(document.querySelectorAll(".trip-dates a"));
const tripClock = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh", dateStyle: "short" });
const departureClock = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul", dateStyle: "short" });
const outbound = new Date("2026-12-13T10:50:00+09:00");

function showSchedule() {
  const now = new Date();
  const localDate = (now < outbound ? departureClock : tripClock).format(now);
  const dateScreen = screens.find(screen => screen.dataset.date === localDate);
  const requestedScreen = screens.find(screen => "#" + screen.id === location.hash);
  const active = requestedScreen || dateScreen || screens[0];

  for (const screen of screens) {
    screen.hidden = screen !== active;
    const label = screen.querySelector("[data-next-label]");
    if (!label) continue;
    label.hidden = true;
    const planned = Array.from(screen.querySelectorAll("[data-next]"));
    for (const step of planned) step.removeAttribute("aria-current");
    if (screen === dateScreen && screen === active) {
      const next = planned.find(step => new Date(step.querySelector("time").dateTime) >= now);
      if (next) {
        next.setAttribute("aria-current", "step");
        label.textContent = "다음 일정 " + next.querySelector("time").textContent + " " + next.querySelector("h3").textContent;
        label.hidden = false;
      }
    }
  }

  for (const link of dateLinks) {
    if (link.hash === "#" + active.id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

for (const link of document.querySelectorAll("a[href^='#']")) {
  const destination = document.getElementById(link.hash.slice(1));
  if (!destination) continue;
  destination.tabIndex = -1;
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (screens.includes(destination)) {
      if (location.hash !== link.hash) history.pushState(null, "", link.hash);
      showSchedule();
    }
    destination.scrollIntoView();
    destination.focus({ preventScroll: true });
  });
}

addEventListener("hashchange", showSchedule);
addEventListener("pageshow", showSchedule);
setInterval(showSchedule, 60_000);
showSchedule();
