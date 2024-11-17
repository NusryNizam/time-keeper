import { axiosInstance } from "./api";
import "./style.css";
import { Photo, UnsplashResponse } from "./types";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

const submitButton = document.getElementById(
  "search-button"
) as HTMLInputElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const searchQuery = searchInput.value.trim();

  if (searchQuery) {
    getData(searchInput.value.trim());
  }
});

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }

  if (event.data.type === "success-image") {
    axiosInstance
      .get(event.data.data, { baseURL: "" })
      .then((e) => {
        console.info("Download success", e);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

async function getData(query: string) {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await axiosInstance.get<UnsplashResponse>(
      "/search/photos",
      {
        params: { query, per_page: 20 },
      }
    );

    renderPhotos(response.data.results, response.data.results.length === 0);
  } catch (error) {
    throw new Error("Failed to fetch photos from Unsplash");
  } finally {
    loaderContainer.innerHTML = "";
  }
}

function renderPhotos(photos: Photo[], isEmpty = false): void {
  const resultsContainer = document.getElementById("results");
  if (!resultsContainer) return;

  resultsContainer.innerHTML = "";

  if (isEmpty) {
    resultsContainer.innerHTML = `
    <div class="no-results caption">No results found.</div>`;

    return;
  }

  // Clear previous results

  // Create and append images for each photo
  photos.forEach((photo) => {
    const imagePreview = document.createElement("image-preview");

    imagePreview.setAttribute("data-src", photo.urls.thumb);
    imagePreview.setAttribute("data-url", photo.urls.thumb);
    imagePreview.setAttribute(
      "data-photographer",
      `${photo.user.first_name} ${photo.user.last_name}`
    );
    imagePreview.setAttribute("data-photographer-link", photo.user.links.html);
    imagePreview.setAttribute(
      "data-photographer-source",
      photo.user.links.html + "?utm_source=stock-pix-penpot&utm_medium=referral"
    );
    imagePreview.setAttribute("data-original-source", photo.links.html);
    imagePreview.setAttribute("data-full-url", photo.urls.regular);
    imagePreview.setAttribute(
      "download-endpoint",
      photo.links.download_location
    );

    resultsContainer.appendChild(imagePreview);
  });
}
