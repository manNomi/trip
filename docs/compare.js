const firstHotel = document.querySelector("#compare-first");
const secondHotel = document.querySelector("#compare-second");
const compareRows = document.querySelectorAll("[data-field]");
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

  if (announce) {
    const firstName = firstCard.querySelector("h3").textContent;
    const secondName = secondCard.querySelector("h3").textContent;
    compareMessage.textContent = firstName + " 및 " + secondName + " 비교 결과가 갱신되었습니다.";
  }
}

renderComparison();
firstHotel.addEventListener("change", () => renderComparison(true));
secondHotel.addEventListener("change", () => renderComparison(true));
