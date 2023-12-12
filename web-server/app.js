const express = require("express");
const path = require("path");
const { searchByFile, filterLikeByField } = require("./modules/json-interface");
const app = express();

const port = 2929;
const pagePath = "./pages/"

require("./modules/db-interface")
//require("./modules/routing")


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `${pagePath}/index/index.html`))
});

app.get("/region_img/:name.svg", (req, res) => {

  let name = req.params.name;

  res.sendFile(path.join(__dirname, `res/svgs/${name}.svg`));
});

app.get("/search_per_region", (req, res) => {
  brand = req.query.brand
  model = req.query.model
  region = req.query.region

  if (!model && !brand) {
    res.status(400).send("inserire i dati");
    return;
  }

  filtered_by_region = searchByFile("regione", region.toUpperCase(), "modello_per_provincia.json");

  if (model) {
    res.send(filterLikeByField("modello", model, filtered_by_region))
    return
  }

  res.send(filterLikeByField("marca", brand, filtered_by_region))

})

app.use('/static', express.static(path.join(__dirname, "/pages")));
app.use('/res', express.static(path.join(__dirname, "/res")));

app.listen(port, () => { console.log(`server partito. porta: `, port) })
