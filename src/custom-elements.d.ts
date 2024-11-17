import { TimerElement } from "/src/components/timer-element.ts";

declare global {
  interface HTMLElementTagNameMap {
    "timer-element": TimerElement;
  }
}
