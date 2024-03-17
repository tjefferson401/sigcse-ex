import { Canvas } from "./graphics.js";

self.canvasInfo = {
  client: undefined,
  active: false,
  initCount: 0,
  state: {},
  getImage: null,
  id: "canvas",
  mouseDownPromise: undefined
}

self.jsgraphics = {
  create_canvas: (width, height) => {
    self.canvasInfo.client = new Canvas(width, height, self.canvasInfo.getImage);
    self.canvasInfo.active = true;
    return self.canvasInfo.client
  },
  // retrieved in python trace function
  _getGraphicsState: () => {
    return deepCopy(self.canvasInfo.state)
  },
  canvasactive : () => {
    return self.canvasInfo.active
  },
  getCreateCanvasCount: () => {
    self.canvasInfo.initCount += 1
    return self.canvasInfo.initCount
  }
};
