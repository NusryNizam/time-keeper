penpot.ui.open("Timekeeper", `?theme=${penpot.theme}`, {
  width: 250,
  height: 160,
});

penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
