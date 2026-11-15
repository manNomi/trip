const picker = document.querySelector(".stay-picker");
const options = [...picker.querySelectorAll('input[name="hotel"]')];
const selectedLabel = document.querySelector("#selected-stay");
const copyButton = document.querySelector("#copy-stay");
const clearButton = document.querySelector("#clear-stay");
const shareInput = document.querySelector("#stay-link");
const message = document.querySelector("#stay-message");
const stayStorageKey = "trip.saigon-2026.stay";
const sharedHotel = new URL(location.href).searchParams.get("hotel");

function readSavedHotel() {
  try {
    return localStorage.getItem(stayStorageKey);
  } catch {
    return null;
  }
}

function updateHotel(hotel) {
  const selected = options.find((option) => option.value === hotel);
  options.forEach((option) => {
    option.checked = option === selected;
  });
  const name = selected?.closest(".stay-card").querySelector("h3").textContent;
  selectedLabel.textContent = name ? `저장한 숙소 ${name}` : "저장한 숙소가 없습니다.";
  copyButton.disabled = !selected;
  clearButton.hidden = !selected;
  shareInput.hidden = true;
  message.textContent = "";
}

function saveSelection(hotel) {
  try {
    if (hotel) localStorage.setItem(stayStorageKey, hotel);
    else localStorage.removeItem(stayStorageKey);
  } catch {
    // 저장이 제한된 브라우저에서도 현재 화면의 선택은 유지한다.
  }
}

updateHotel(options.some((option) => option.value === sharedHotel) ? sharedHotel : readSavedHotel());

picker.addEventListener("change", (event) => {
  const hotel = event.target.value;
  updateHotel(hotel);
  saveSelection(hotel);

  const url = new URL(location.href);
  if (url.searchParams.has("hotel")) {
    url.searchParams.set("hotel", hotel);
    history.replaceState(null, "", url);
  }
});

clearButton.addEventListener("click", () => {
  updateHotel(null);
  saveSelection(null);
  const url = new URL(location.href);
  url.searchParams.delete("hotel");
  history.replaceState(null, "", url);
  options[0].focus();
});

copyButton.addEventListener("click", async () => {
  const selected = options.find((option) => option.checked);
  if (!selected) return;

  const url = new URL(location.href);
  url.searchParams.set("hotel", selected.value);
  url.hash = selected.value;

  shareInput.value = url.href;
  shareInput.hidden = false;

  try {
    await navigator.clipboard.writeText(url.href);
    message.textContent = "숙소 링크를 복사했습니다.";
  } catch {
    shareInput.focus();
    shareInput.select();
    message.textContent = "표시된 주소를 복사해 공유할 수 있습니다.";
  }
});
