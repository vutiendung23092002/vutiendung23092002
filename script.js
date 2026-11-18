const profile = Object.freeze({
  facebook: "https://www.facebook.com/dugg2309202",
  instagram: "https://www.instagram.com/dugg2309",
  github: "https://github.com/vutiendung23092002",
  tiktok: "https://www.tiktok.com/@dugn2309202",
});

document.querySelectorAll("[data-social]").forEach((link) => {
  const network = link.dataset.social;
  const url = profile[network];

  if (typeof url === "string" && /^https:\/\//i.test(url)) {
    link.href = url;
  }
});

// Keep the full name on one line, including while the local font loads.
const nameHeading = document.querySelector(".hero-name");
const nameText = nameHeading?.querySelector("span");

function fitName() {
  if (!nameHeading || !nameText) return;
  nameText.style.removeProperty("font-size");
  const availableWidth = nameHeading.clientWidth;
  const textWidth = nameText.getBoundingClientRect().width;
  if (textWidth > availableWidth && availableWidth > 0) {
    const fontSize = parseFloat(getComputedStyle(nameHeading).fontSize);
    nameText.style.fontSize = `${Math.floor((fontSize * availableWidth) / textWidth)}px`;
  }
}

fitName();
document.fonts?.ready.then(fitName);
if (nameHeading && typeof ResizeObserver !== "undefined") {
  new ResizeObserver(fitName).observe(nameHeading);
} else {
  window.addEventListener("resize", fitName, { passive: true });
}

document.querySelector("#copyright-year").textContent = new Date().getFullYear();

const gardenAudio = document.querySelector("#garden-audio");
const soundToggle = document.querySelector(".sound-toggle");
const soundStatus = document.querySelector("#sound-status");

if (gardenAudio && soundToggle && soundStatus) {
  function syncSound() {
    soundToggle.setAttribute("aria-pressed", String(!gardenAudio.paused));
    soundToggle.title = gardenAudio.paused ? "Bật âm thanh" : "Tắt âm thanh";
  }

  gardenAudio.addEventListener("play", syncSound);
  gardenAudio.addEventListener("pause", syncSound);
  soundToggle.addEventListener("click", async () => {
    soundStatus.textContent = "";
    if (!gardenAudio.paused) {
      gardenAudio.pause();
      syncSound();
      return;
    }

    try {
      if (gardenAudio.error) gardenAudio.load();
      await gardenAudio.play();
    } catch (error) {
      if (error.name !== "AbortError") {
        syncSound();
        soundStatus.textContent = "Không phát được âm thanh khu vườn. Bạn có thể thử lại.";
      }
    }
  });

  soundToggle.hidden = false;
}
