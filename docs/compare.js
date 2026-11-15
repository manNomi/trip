const firstHotel = document.querySelector("#compare-first");
const secondHotel = document.querySelector("#compare-second");
const compareRows = document.querySelectorAll("[data-field]");
const photoRow = document.querySelector("[data-compare-photos]");
const compareMessage = document.querySelector("#compare-message");
const hotelCards = new Map(
  [...document.querySelectorAll("[data-hotel]")].map((card) => [card.dataset.hotel, card]),
);

function renderComparison(announce = false) {
  for (const option of firstHotel.options) option.disabled = option.value === secondHotel.value;
  for (const option of secondHotel.options) option.disabled = option.value === firstHotel.value;

  const firstCard = hotelCards.get(firstHotel.value);
  const secondCard = hotelCards.get(secondHotel.value);

  for (const row of compareRows) {
    const field = row.dataset.field;
    row.cells[1].textContent = firstCard.querySelector('[data-compare="' + field + '"]').textContent;
    row.cells[2].textContent = secondCard.querySelector('[data-compare="' + field + '"]').textContent;
  }

  for (const [index, card] of [firstCard, secondCard].entries()) {
    const photos = [...card.querySelectorAll(".stay-media .photo-link")].map((photo) => {
      const preview = photo.cloneNode(true);
      preview.querySelector("img").loading = "lazy";
      return preview;
    });
    photoRow.cells[index + 1].querySelector(".compare-photo-pair").replaceChildren(...photos);
  }
  photoRow.hidden = false;

  if (announce) {
    const firstName = firstCard.querySelector("h3").textContent;
    const secondName = secondCard.querySelector("h3").textContent;
    compareMessage.textContent = firstName + " 및 " + secondName + " 비교 결과가 갱신되었습니다.";
  }
}

renderComparison();
firstHotel.addEventListener("change", () => renderComparison(true));
secondHotel.addEventListener("change", () => renderComparison(true));
