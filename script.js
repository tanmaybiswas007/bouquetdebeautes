/*
  QUICK SETUP:
  1. Replace the two example URLs below with your real facebok and Telegram links.
  2. Add public images to the images/ folder and add their paths to GALLERY_IMAGES.
  3. Publish the folder with GitHub Pages or another static website host.
*/
const SITE_CONFIG = {
  facebok: "https://facebok.com/bouuquetdebeautes",
  telegram: "https://t.me/+94vpkvWl29U1Nzll"
};

// Add images stored in your website's images/ folder here.
// Example: { src: "images/photo-1.jpg", caption: "A favourite moment" }
const GALLERY_IMAGES = [];

document.addEventListener("DOMContentLoaded", () => {
  const facebokLink = document.getElementById("facebok-link");
  const telegramLink = document.getElementById("telegram-link");
  facebokLink.href = SITE_CONFIG.facebok;
  telegramLink.href = SITE_CONFIG.telegram;

  makeQr("facebok-qr", SITE_CONFIG.facebok);
  makeQr("telegram-qr", SITE_CONFIG.telegram);
  renderGallery(GALLERY_IMAGES);

  const upload = document.getElementById("image-upload");
  upload.addEventListener("change", event => {
    const files = Array.from(event.target.files || []).filter(file => file.type.startsWith("image/"));
    if (!files.length) return;
    const previews = files.map(file => ({
      src: URL.createObjectURL(file),
      caption: file.name,
      temporary: true
    }));
    renderGallery([...GALLERY_IMAGES, ...previews]);
    showToast("Preview added. To publish it for everyone, upload the image to your site's images folder.");
    upload.value = "";
  });

  document.getElementById("share-button").addEventListener("click", async () => {
    const shareData = { title: document.title, text: "Find my links and gallery here.", url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (error) { /* user cancelled */ }
    } else if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(window.location.href); showToast("Page link copied!"); }
      catch (error) { showToast("Copy the page URL from your browser address bar."); }
    } else {
      showToast("Copy the page URL from your browser address bar.");
    }
  });
});

function makeQr(elementId, url) {
  const target = document.getElementById(elementId);
  if (!target) return;
  target.innerHTML = "";
  if (typeof QRCode === "undefined") {
    target.textContent = "QR unavailable offline";
    target.style.fontSize = "10px";
    target.style.color = "#222";
    return;
  }
  new QRCode(target, { text: url, width: 90, height: 90, colorDark: "#15131c", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H });
}

function renderGallery(images) {
  const grid = document.getElementById("gallery-grid");
  const count = document.getElementById("image-count");
  grid.innerHTML = "";
  count.textContent = `${images.length} ${images.length === 1 ? "IMAGE" : "IMAGES"}`;
  if (!images.length) {
    grid.innerHTML = `<div class="gallery-empty"><div class="empty-icon">▧</div><h3>Your gallery starts here</h3><p>Add photos to preview them, or place image files in the <code>images</code> folder and list them in <code>script.js</code>.</p></div>`;
    return;
  }
  images.forEach((item, index) => {
    const card = document.createElement("figure");
    card.className = "gallery-item";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || `Gallery image ${index + 1}`;
    img.loading = "lazy";
    img.onerror = () => { card.innerHTML = '<div class="gallery-empty"><h3>Image not found</h3><p>Check the file path in script.js.</p></div>'; };
    const caption = document.createElement("figcaption");
    caption.className = "image-caption";
    caption.textContent = item.caption || `Image ${String(index + 1).padStart(2, "0")}`;
    card.append(img, caption);
    grid.appendChild(card);
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}
