penpot.ui.open(
  "StockPix - Search for free stock photos",
  `?theme=${penpot.theme}`,
  { width: 460, height: 600 }
);

penpot.ui.onMessage<{ type: string; data: any }>((message) => {
  if (message.type === "add-image") {
    penpot
      .uploadMediaUrl("unsplash-image", message.data.url)
      .then((imageData) => {
        const shape = penpot.createRectangle();
        shape.boardX = penpot.viewport.center.x;
        shape.boardY = penpot.viewport.center.y;
        shape.resize(imageData.width, imageData.height);
        shape.fills = [
          { fillOpacity: 1, fillImage: { ...imageData, keepApectRatio: true } },
        ];

        penpot.ui.sendMessage({
          type: "success-image",
          data: message.data.downloadEndpoint,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
