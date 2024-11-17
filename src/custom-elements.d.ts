import { ImagePreview } from "/src/components/image-preview.ts";

declare global {
  interface HTMLElementTagNameMap {
    "image-preview": ImagePreview;
  }
}
