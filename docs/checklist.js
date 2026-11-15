const checklist = document.querySelector(".checklist");
const storageKey = "trip.saigon-2026.checklist";
const boxes = checklist.querySelectorAll('input[type="checkbox"]');

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
  try {
    const checked = Array.from(boxes)
      .filter((box) => box.checked)
      .map((box) => box.value);
    localStorage.setItem(storageKey, JSON.stringify(checked));
  } catch {
    // Keep the current selection even when it cannot be saved.
  }
});
