import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("timer-element")
export class TimerElement extends LitElement {
  @property({ type: Number, attribute: "data-text" }) timer: number = 0;

  static styles = css`
    .example-element {
      background-color: rgb(255 255 255 / 10%);
    }
  `;

  handleClick() {
    // this is a sample function and condition below.
    // Do whatever you want in this
  }

  // Render the UI as a function of component state
  render() {
    return html`<div class="timer-element"></div>`;
  }
}
