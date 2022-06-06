const html = `
<style>
  html {
    width: 456px;
    height: 250px;
  }
  body {
    margin: 0;
  }
  .extendedh {
    width: 100%;
  }
  .extendedv {
    height: 100%;
  }
  #wrapper {
    padding: 10px 20px;
    background-color: rgba(35, 34, 38, 1);
    box-sizing: border-box;
    height: 250px;
  }
  #wrapper h1 {
    font-weight: bold;
    color: #fff;
    font-size: 20px;
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
    border: solid 1px #4A4A4A;
    outline: none;
    background: none;
    color: rgb(180, 180, 180);
  }
  input:focus {
    border-color: #eee;
  }

  button {
    outline: nonw;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: rgb(180, 180, 180);
  }
</style>
<div id="wrapper">
  <h1>Scene API</h1>
  <p>
    <input id="bg-color" placeholder="Background colour" />
    <input id="scene-mode" placeholder="scene3d" />
    <button id="skybox">Skybox</button>
    <button id="remove">Remove</button>
  </p>
  <h1>Layer API</h1>
  <p>
    <button id="add-layer">Add Layer</button>
  </p>
</div>
<script>
  let skyboxEnabled, bgcolor, sceneMode;

  document.getElementById("remove").addEventListener("click", (e) => {
    parent.postMessage(undefined, "*");
  });

  document.getElementById("bg-color").addEventListener("change", (e) => {
    bgcolor = e.currentTarget.value;
    parent.postMessage({ default: { bgcolor: bgcolor } }, "*");
  });

  document.getElementById("scene-mode").addEventListener("change", (e) => {
    sceneMode = e.currentTarget.value;
    parent.postMessage({ default: { sceneMode: sceneMode } }, "*");
  });

  document.getElementById("skybox").addEventListener("click", (e) => {
    if (!skyboxEnabled) {
      skyboxEnabled = true;
    } else {
      skyboxEnabled = false;
    }

    parent.postMessage({ default: { skybox: skyboxEnabled } }, "*");

    if (skyboxEnabled === true) {
      e.currentTarget.textContent = "Skybox Enabled";
    } else {
      e.currentTarget.textContent = "Skybox Disabled";
    }
  });

  document.getElementById("add-layer").addEventListener("click", (e) => {
    parent.postMessage({actionField: 'layer', action: 'addLayer'}, "*");
  });
</script>

`;

reearth.ui.show(html, {
    height: 250,
    width: 456
});

reearth.on("message", msg => {
    if(msg.actionField && msg.actionField === 'layer'){
        // if(msg.action === 'addLayer'){
        //     reearth.layers.add();
        // }
    }else{
        reearth.visualizer.overrideProperty(msg)
    }
});