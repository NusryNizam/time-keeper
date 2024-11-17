penpot.ui.open("Timekeeper", `?theme=${penpot.theme}`, {
  width: 250,
  height: 160,
});

penpot.ui.onMessage<{ type: string; data: any }>((message) => {
  if (message.type === "create-text") {
    penpot.createText("Hello!");
  }
});

penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
