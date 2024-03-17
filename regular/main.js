import { TestCanvas } from "../graphics/ExpCanvas.js";
let pyodide;

export const updateCanvas = (shapes) => {
  debouncedRedraw(shapes)
}

self.create_canvas = () => {
  console.log("nere")
  const canvas = new TestCanvas(updateCanvas)
  return canvas
}

let debouncedTimer  = null;


function debouncedRedraw(shapes) {
  const framesPerSecond = 60;
  const timeout = 1000 / framesPerSecond;
  if (!debouncedTimer) {
    debouncedTimer = setTimeout(() => {
      redrawShapes(shapes);
    }, timeout);
  }
}


function redrawShapes(shapes){
  // clear the debounced timer
  clearTimeout(debouncedTimer);
  debouncedTimer = null;
  window.requestAnimationFrame(() => {
    window.context.clearRect(0, 0, 400, 400);
    for (let objectId in shapes) {

      const data = shapes[objectId];
      if(!data || data.isHidden) continue;
      const objectType = data["type"];
      switch (objectType) {
        case "circle": renderCircle(window.context, data); break;
      }
    }
  });
}


function renderCircle(ctx, data) {
  ctx.beginPath();
  ctx.fillStyle = data.color;
  ctx.arc(data.x, data.y, data.r, 0, 2 * Math.PI);
  ctx.fill();
}

export async function load() {
  if(pyodide) { return; }
  console.log("loading begin")

  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
  });

  console.log("loading end")
  return;
}

export async function run_code(code) {
  await pyodide.runPython(code);
}




// async function do_the_thing() {
//   await load()
//   const start = Date.now()
//   run_code(`
//    for i in range(100000):
//       pass
//    `)
//    const end = Date.now()
//    console.log(end - start)
// }


// do_the_thing()




