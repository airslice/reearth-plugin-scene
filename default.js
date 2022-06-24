const html = `
  <style>
    html {
      width: 456px;
      height: 250px;
    }

    body {
      margin: 0;
      font-size: 12px;
    }

    .extendedh {
      width: 100%;
    }

    .extendedv {
      height: 100%;
    }

    #wrapper {
      padding: 10px 20px;
      background-color: rgba(35, 34, 38, 0.75);
      box-sizing: border-box;
      height: 250px;
    }

    #wrapper h1 {
      font-weight: bold;
      color: #fff;
      font-size: 18px;
      margin-bottom: 0.2em;
    }

    .api-item {
      margin: 2px 0;
      display: flex;
    }

    .api-item span {
      flex-shrink: 0;
      display: inline-block;
      width: 150px;
      color: rgb(180, 180, 180);
      padding: 0 10px;
      box-sizing: border-box;
    }

    .hidden {
      display: none;
    }

    .extendedh body,
    .extendedh #wrapper {
      width: 100%;
    }

    .extendedv body,
    .extendedv #wrapper {
      height: 100%;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: #000;
    }

    ::-webkit-scrollbar-thumb {
      background: #4a4a4a;
    }

    ::-webkit-scrollbar-corner {
      background: #000;
    }

    input,
    input:focus {
      border: solid 1px #4a4a4a;
      outline: none;
      background: none;
      color: rgb(180, 180, 180);
      padding: 2px 10px;
      width: 100%;
    }

    input:-internal-autofill-previewed,
    input:-internal-autofill-selected {
      background-color: rgba(0, 0, 0, 0) !important;
    }

    button {
      outline: nonw;
      border: none;
      background: rgba(0, 0, 0, 0.5);
      color: rgb(180, 180, 180);
      font-size: 12px;
      cursor: pointer;
      width: 100%;
      height: 21px;
    }

    button:hover {
      color: #fff;
    }
  </style>
  <div id="wrapper">
    <div class="api-field">
      <h1>Scene API</h1>
      <div class="api-item">
        <span>Background Color</span><input id="bg-color" placeholder="#RRGGBBAA" autocomplete="off" />
      </div>
      <div class="api-item">
        <span>Scene Mode</span><input id="scene-mode" placeholder="3d" autocomplete="off" />
      </div>
      <div class="api-item">
        <span>Skybox</span><button id="skybox">Skybox</button>
      </div>
      <div class="api-item">
        <span>Remove All</span><button id="remove">Remove</button>
      </div>
    </div>

    <div class="api-field">
      <h1>Layer API</h1>
      <div class="api-item">
        <span>ExtensionIds</span><button id="layer-extension-ids">extensionIds</button>
      </div>
      <div class="api-item">
        <span>Add Layer</span><button id="layer-add-random-marker">Random Marker</button>
      </div>
    </div>
  </div>
  <script>
    console.log("plugin inited");

    let skyboxEnabled, bgcolor, sceneMode;

    document.getElementById("remove").addEventListener("click", (e) => {
      parent.postMessage(undefined, "*");
    });

    document.getElementById("bg-color").addEventListener("change", (e) => {
      bgcolor = e.currentTarget.value;
      parent.postMessage({
        default: {
          bgcolor: bgcolor
        }
      }, "*");
    });

    document.getElementById("scene-mode").addEventListener("change", (e) => {
      sceneMode = e.currentTarget.value;
      parent.postMessage({
        default: {
          sceneMode: sceneMode
        }
      }, "*");
    });

    document.getElementById("skybox").addEventListener("click", (e) => {
      if (!skyboxEnabled) {
        skyboxEnabled = true;
      } else {
        skyboxEnabled = false;
      }

      parent.postMessage({
        default: {
          skybox: skyboxEnabled
        }
      }, "*");

      if (skyboxEnabled === true) {
        e.currentTarget.textContent = "Skybox Enabled";
      } else {
        e.currentTarget.textContent = "Skybox Disabled";
      }
    });

    document.getElementById("layer-add-random-marker").addEventListener("click", (e) => {
      parent.postMessage({
        actionField: "layer",
        action: "addRandomMarker"
      }, "*");
    });
    document.getElementById("layer-extension-ids").addEventListener("click", (e) => {
      parent.postMessage({
        actionField: "layer",
        action: "extensionIds"
      }, "*");
    });
  </script>
`;

reearth.ui.show(html, {
  height: 250,
  width: 456
});

let markerCount = 0;
reearth.on("message", msg => {
  if (msg && msg.actionField && msg.actionField === 'layer') {
    switch (msg.action) {
      case 'addRandomMarker':
        reearth.layers.append({
          extensionId: "marker",
          isVisible: true,
          title: "Marker",
          property: {
            default: {
              location: {
                lat: 49 - 1 * markerCount,
                lng: -102,
              },
              label: true,
              labelText: markerCount.toString(),
            },
          },
          tags: [],
        });
        markerCount ++;
        break;
      case 'extensionIds':
        console.log(reearth.layers.extensionIds);
        break;
      default:
        break;
    }
  } else {
    reearth.visualizer.overrideProperty(msg)
  }
});