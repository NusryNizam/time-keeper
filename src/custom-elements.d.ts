import { ExampleElement } from "/src/components/example-element.ts";

declare global {
  interface HTMLElementTagNameMap {
    "example-element": ExampleElement;
  }
}
