const express = require("express");
const stockController = require("../controllers/stock.controller");
const app = express();

app.get("/", stockController.getAllEndowments);
app.get("/mock/", stockController.getAllEndowmentsApi);
app.get("/mock/:id", stockController.getAllEndowmentsApiById);
app.post("/",stockController.createEndowment);
app.delete("/:id",stockController.deleteEndowment);

module.exports = app;
