// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

// document.querySelector("example-element")?.addEventListener("click", () => {
//   // send message to plugin.ts
//   parent.postMessage("create-text", "*");

//   // set attributes for custom element
//   const el = document.querySelector("example-element");
//   el.setAttribute("data-text", "Other Text");
// });

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});

import { Timer } from "timer-node";

// Event listeners for start and stop buttons
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
stopButton.style.display = "none";

let timeElapsed = new Timer({ label: "main-timer" });
let timerInterval;

let formattedTime = "00:00";
let formattedHours = "00";
let formattedMinutes = "00";
let formattedSeconds = "00";

// Update the formatted time when the timer updates
function formatTime() {
  formattedHours = timeElapsed.format("%h");
  formattedMinutes = timeElapsed.format("%m");
  formattedSeconds = timeElapsed.format("%s");

  formattedTime = `${
    formattedHours === "00" ? "" : formattedHours + ":"
  }${formattedMinutes}:${formattedSeconds}`;

  document.getElementById("timeDisplay").textContent = formattedTime;
  console.log("TIME:", formattedTime);
}

// Start the timer
function startTimer() {
  startButton.style.display = "none";
  stopButton.style.display = "inline";
  if (timerInterval) return; // Prevent starting multiple intervals

  timeElapsed.start();

  // Update the display every second
  timerInterval = setInterval(() => {
    formatTime();
  }, 1000);
}

// Stop the timer
function stopTimer() {
  startButton.style.display = "inline";
  startButton.textContent = "Restart";
  stopButton.style.display = "none";

  timeElapsed.stop();
  clearInterval(timerInterval);
  timerInterval = null;
}
