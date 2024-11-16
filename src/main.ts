import { axiosInstance } from "./api";
import "./style.css";
import { Photo, UnsplashResponse } from "./types";
import "/src/components/PhotoPreview";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

const submitButton = document.getElementById(
  "search-button"
) as HTMLInputElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  getData(searchInput.value.trim());
});

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }

  console.log(event.data);
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
  try {
    const response = await axiosInstance.get<UnsplashResponse>(
      "/search/photos",
      {
        params: { query, per_page: 20 },
      }
    );

    renderPhotos(response.data.results);
  } catch (error) {
    throw new Error("Failed to fetch photos from Unsplash");
  }
}

function renderPhotos(photos: Photo[]): void {
  const resultsContainer = document.getElementById("results");
  if (!resultsContainer) return;

  // Clear previous results
  resultsContainer.innerHTML = "";

  // Create and append images for each photo
  photos.forEach((photo) => {
    const photoPreview = document.createElement("photo-preview");

    photoPreview.setAttribute("data-src", photo.urls.thumb);
    photoPreview.setAttribute("data-url", photo.urls.thumb);
    photoPreview.setAttribute(
      "data-photographer",
      `${photo.user.first_name} ${photo.user.last_name}`
    );
    photoPreview.setAttribute("data-photographer-link", photo.user.links.html);
    photoPreview.setAttribute(
      "data-photographer-source",
      photo.user.links.html + "?utm_source=stock-pix-penpot&utm_medium=referral"
    );
    photoPreview.setAttribute("data-original-source", photo.links.html);
    photoPreview.setAttribute("data-full-url", photo.urls.regular);
    photoPreview.setAttribute(
      "download-endpoint",
      photo.links.download_location
    );

    resultsContainer.appendChild(photoPreview);
  });
}
