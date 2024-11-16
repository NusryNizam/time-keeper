import { photoPreviewTemplate } from "/src/components/photoPreview.template.js";

document.body.insertAdjacentHTML("beforeend", photoPreviewTemplate);

class PhotoPreview extends HTMLElement {
  private imageElement: HTMLImageElement;
  private infoOverlay: HTMLDivElement;
  private imageURL: HTMLLinkElement;
  private photographerSource: HTMLLinkElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Clone the template content
    const template = document.querySelector("template");
    if (template) {
      shadow.appendChild(template.content.cloneNode(true));
    }

    // Find the img element within the shadow DOM
    this.imageElement = shadow.querySelector("img") as HTMLImageElement;
    this.infoOverlay = shadow.querySelector(".info-overlay") as HTMLDivElement;
    this.imageURL = shadow.querySelector("#image-url") as HTMLLinkElement;
    this.photographerSource = shadow.querySelector(
      "#photographer-source"
    ) as HTMLLinkElement;

    if (this.imageElement) {
      this.imageElement.alt = "Image Preview";
    }

    const wrapper = shadow.querySelector("div");
    if (wrapper) {
      wrapper.addEventListener("mouseover", () => {
        this.infoOverlay.style.opacity = "1";
      });
      wrapper.addEventListener("mouseout", () => {
        this.infoOverlay.style.opacity = "0";
      });

      // Handle click
      wrapper.addEventListener("click", () => {
        const url = this.getAttribute("data-full-url");
        const downloadEndpoint = this.getAttribute("download-endpoint");

        if (url && downloadEndpoint) {
          parent.postMessage(
            {
              type: "add-image",
              data: {
                url,
                downloadEndpoint,
              },
            },
            "*"
          );
        }
      });
    }
  }

  // Watch for changes to the `data-src` and other attributes
  static get observedAttributes() {
    return [
      "data-src",
      "data-url",
      "data-photographer",
      "data-original-source",
      "data-photographer-source",
      "data-full-url",
    ];
  }

  // Respond to attribute changes
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "data-src" && this.imageElement) {
      this.imageElement.src = newValue || "";
    }

    if (name === "data-photographer" && this.photographerSource) {
      this.photographerSource.textContent = newValue || "Unknown Photographer";
    }

    if (name === "data-photographer-source" && this.photographerSource) {
      this.photographerSource.href = newValue || "Unknown Source";
    }

    if (name === "data-original-source" && this.imageURL) {
      this.imageURL.href = newValue || "Unknown Source";
    }

    if (name === "data-full-url" && this.imageURL) {
      this.imageURL.dataset.fullURL = newValue || "Unknown Source";
    }
  }
}

customElements.define("photo-preview", PhotoPreview);
