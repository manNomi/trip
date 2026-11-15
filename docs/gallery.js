const viewer = document.querySelector("#photo-viewer");

if (typeof viewer.showModal === "function") {
  const viewerImage = viewer.querySelector("img");
  const viewerTitle = viewer.querySelector("#photo-title");
  const original = viewer.querySelector(".original-photo");

  for (const link of document.querySelectorAll(".photo-link")) {
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const description = link.querySelector("img").alt;
      viewerTitle.textContent = description;
      viewerImage.alt = description;
      viewerImage.src = link.href;
      original.href = link.href;
      viewer.showModal();
      event.preventDefault();
    });
  }
}
