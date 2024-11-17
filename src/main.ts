import "./style.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

document.querySelector("example-element")?.addEventListener("click", () => {
  // send message to plugin.ts
  parent.postMessage("create-text", "*");

  // set attributes for custom element
  const el = document.querySelector("example-element");
  el.setAttribute("data-text", "Other Text");
});

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});
