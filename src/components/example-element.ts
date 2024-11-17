import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("example-element")
export class ExampleElement extends LitElement {
  @property({ type: String, attribute: "data-text" }) dataText: string =
    "World";

  static styles = css`
    .example-element {
      background-color: rgb(255 255 255 / 10%);
    }
  `;

  handleClick() {
    // this is a sample function and condition below.
    // Do whatever you want in this
    if (this.dataText) {
      // sample logic
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`<div class="example-element">
      <p>Hello ${this.dataText}</p>
      <button @click=${this.handleClick}>Click</button>
    </div>`;
  }
}
