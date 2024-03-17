import { load, run_code } from "./regular/main.js";
import { setPyodide, PyodideApi } from "./unthrow/main.js";
import {} from "./graphics/globals.js"
import { run_py, loadww } from "./webworker/main.js";
import { run_brython } from "./brython/main.js";

const pyodideClient = new PyodideApi()

self.canvas = document.getElementById("canvas")
self.context = self.canvas.getContext("2d")

fetch("realpy/web.py")
  .then((res) => res.text())
  .then((text) => {
    // do something with "text"
    document.getElementById("codeInput").value = text
   })
  .catch((e) => console.error(e));



async function run(runType, code) {
  switch(runType) {
      case 'pure-pyodide':
          // Add your code to handle this case
          await load()
          console.time('test');
          await run_code(code)
          console.timeEnd('test');
          break;
      case 'cip':
          // Add your code to handle this case
          await setPyodide()
          console.time('test');
          await pyodideClient.runPython(code, { name: "main.py"})
          console.timeEnd('test');
          break;
      case 'web-worker':
          // Add your code to handle this case
          console.log('here')
          await loadww()
          console.log("running")
          console.time('test');
          await run_py(code)
          console.timeEnd('test');
          console.log("endrunning")
          break;
      case 'brython':
          run_brython()
          break;
      default:
          console.error('Invalid run type');
  }
}

function runCode() {
  const code = document.getElementById('codeInput').value;
  const runType = document.getElementById('runTypeSelect').value;
  run(runType, code);
}

document.getElementById('runButton').addEventListener('click', runCode);
