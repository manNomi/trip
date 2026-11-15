const viewer = document.querySelector("#photo-viewer");

if (typeof viewer?.showModal === "function") {
  const viewerImage = viewer.querySelector("img");
  const viewerTitle = viewer.querySelector("#photo-title");
  const original = viewer.querySelector(".original-photo");
  const navigation = viewer.querySelector(".photo-navigation");
  const photoCount = navigation?.querySelector("[data-photo-count]");
  let photos = [];
  let currentIndex = 0;

  function showPhoto() {
    const link = photos[currentIndex];
    const description = link.querySelector("img").alt;
    viewerTitle.textContent = description;
    viewerImage.alt = description;
    viewerImage.src = link.href;
    original.href = link.href;
    if (navigation) {
      navigation.hidden = photos.length < 2;
      photoCount.textContent = `${currentIndex + 1} / ${photos.length}`;
    }
  }

  function movePhoto(offset) {
    currentIndex = (currentIndex + offset + photos.length) % photos.length;
    showPhoto();
  }

  for (const link of document.querySelectorAll(".photo-link")) {
    link.setAttribute("aria-haspopup", "dialog");
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest(".photo-link");
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const card = navigation && link.closest(".stay-card");
    photos = card ? [...card.querySelectorAll(".photo-link")] : [link];
    currentIndex = photos.indexOf(link);
    showPhoto();
    viewer.showModal();
    event.preventDefault();
  });

  navigation?.querySelector("[data-photo-prev]").addEventListener("click", () => movePhoto(-1));
  navigation?.querySelector("[data-photo-next]").addEventListener("click", () => movePhoto(1));
}
