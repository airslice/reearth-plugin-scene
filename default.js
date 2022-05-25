const html = `
<style>
  body { margin: 0; }
  .extendedh { width: 100%; }
  .extendedv { height: 100%; }
  #wrapper {
    padding: 4px;
    border: 1px solid rgb(111, 111, 111);
    border-radius: 5px;
    // background-color: rgba(111, 111, 111, 0.5);
    background: red;
    height: 500px;
    width: 500px;
    box-sizing: border-box;
  }
  .extendedh body, .extendedh #wrapper { width: 100%; }
  .extendedv body, .extendedv #wrapper { height: 100%; }
  ::-webkit-scrollbar { width: 8px; background: gray; }
  ::-webkit-scrollbar-thumb { border-radius: 4px; background: red; }
</style>
<div id="wrapper">
  <p style="color:white;">Scene API</p>
  <p>
    <input id="bg-color" placeholder="Background colour" />
    <button id="skybox">Skybox</button>
    <button id="remove">Remove</button>
  </p>
</div>
<script>
    let skyboxEnabled, bgcolor;

    document.getElementById("remove").addEventListener("click", (e) => {
        parent.postMessage(undefined, "*")
    });

    document.getElementById("bg-color").addEventListener("change", (e) => {
        bgcolor = e.currentTarget.value;
        parent.postMessage({default: {"bgcolor": bgcolor}}, "*")
    });
    
    document.getElementById("skybox").addEventListener("click", (e) => {
        if (!skyboxEnabled) {
            skyboxEnabled = true;
        } else{
            skyboxEnabled = false;
        }

        parent.postMessage({default:{"skybox": skyboxEnabled}}, "*")
        
        if(skyboxEnabled === true) {
            e.currentTarget.textContent = "Skybox Enabled"
            }else{
                e.currentTarget.textContent = "Skybox Disabled"
            }
    });

</script>
`;

reearth.ui.show(html, {height: 500, width: 500});

reearth.on("message", msg => {
    reearth.visualizer.overrideProperty(msg)
});
