const checklist = document.querySelector(".checklist");
const storageKey = "trip.saigon-2026.checklist";
const boxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
const progress = document.querySelector("#checklist-progress");
const nextPreparation = document.querySelector("#next-preparation");

function checkedValues() {
  return boxes.filter((box) => box.checked).map((box) => box.value);
}

function updateProgress() {
  progress.textContent = `${checkedValues().length}/${boxes.length}`;
  const next = boxes.find((box) => !box.checked);
  nextPreparation.textContent = next
    ? next.closest("label").textContent.trim()
    : "출발 준비를 완료했습니다.";
  nextPreparation.hidden = false;
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(saved)) {
    boxes.forEach((box) => {
      box.checked = saved.includes(box.value);
    });
  }
} catch {
  // The checklist is still usable when the browser blocks storage.
}

checklist.addEventListener("change", () => {
  updateProgress();
  try {
    localStorage.setItem(storageKey, JSON.stringify(checkedValues()));
  } catch {
    // Keep the current selection even when it cannot be saved.
  }
});

updateProgress();
