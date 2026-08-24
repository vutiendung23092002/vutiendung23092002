const profile = Object.freeze({
  facebook: "https://www.facebook.com/dugg2309202",
  instagram: "https://www.instagram.com/dugg2309202",
  github: "https://github.com/vutiendung23092002",
  tiktok: "https://www.tiktok.com/@duggn2309",
});

document.querySelectorAll("[data-social]").forEach((link) => {
  const network = link.dataset.social;
  const url = profile[network];

  if (typeof url === "string" && /^https:\/\//i.test(url)) {
    link.href = url;
  }
});
