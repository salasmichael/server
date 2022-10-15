require("dotenv").config();
const Stock = require("../models/stock.model");
const {
  errorResponseFormat,
  successResponseFormat,
} = require("../functions/responseFunctions");
const axios = require('axios');

exports.getAllEndowments = (req, res) => {
  Stock.findAll()
    .then((data) => {
      res.status(200).send(successResponseFormat(data));
    })
    .catch(() => {
      res
        .status(500)
        .send(
          errorResponseFormat(
            "Ha ocurrido un error, por favor intenta mas tarde"
          )
        );
    });
};

exports.getAllEndowmentsApi = (req, res) => {
  axios.get(process.env.URLMOCK)
  .then(response => {
    res.status(200).send(successResponseFormat(response.data));
  })
  .catch(error => {
    res
        .status(500)
        .send(
          errorResponseFormat(
            "Ha ocurrido un error, por favor intenta mas tarde"
          )
        );
  });

 
};
exports.getAllEndowmentsApiById = (req, res) => {
  const { id } = req.params;

  axios.get(`${process.env.URLMOCK}/${id}`)
  .then(response => {
    res.status(200).send(successResponseFormat(response.data));
  })
  .catch(error => {
    console.log(error);
    res
        .status(500)
        .send(
          errorResponseFormat(
            "Ha ocurrido un error, por favor intenta mas tarde"
          )
        );
  });

 
};

exports.createEndowment = async (req, res) => {
  const { body } = req;

  const foundEndowments = await Stock.findOne({
    where: { email: body.email,
             serial: body.serial},
  });
  if (foundEndowments) {
    res
      .status(200)
      .send(errorResponseFormat(`El usuario con correo: ${body.email} ya cuenta con este equipo asociado!`));
  } else {
    Stock.create({
      serial: body.serial,
      name: body.name,
      type: body.type,
      sysOperative: body.sysOperative,
      username: body.username,
      email: body.email,
      dateAssignment: body.dateAssignment,
    })
      .then(() => {
        res
          .status(200)
          .send(successResponseFormat("Registrado exitosamente"));
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(
            errorResponseFormat(
              "Ha ocurrido un error, por favor intenta mas tarde"
            )
          );
      });
  }
};


exports.deleteEndowment = (req, res) => {
  const { id } = req.params;

  Stock.destroy(
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res
        .status(200)
        .send(successResponseFormat("eliminado exitosamente"));
    })
    .catch(() => {
      res.status(500).send(errorResponseFormat("Error al eliminar"));
    });
};
