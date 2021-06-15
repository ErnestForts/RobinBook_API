const {
  createPlace,
  getPlaceById,
  getPlaces,
  updatePlace,
  deleteUser
  } = require("./book.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");

const saltRounds = 10;
  
  module.exports = {
    createPlace: (req, res) => {
      const body = req.body;
      console.log(body.Nombre);
      // body.Password = hashSync(body.Password, saltRounds);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: err
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    getPlaceById: (req, res) => {
      const id = req.params.id;
      getPlaceById(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getPlaces: (req, res) => {
      getPlaces((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    updatePlace: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.Password = hashSync(body.Password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deletePlace: (req, res) => {
      const data = req.body;
      console.log(data);
      deletePlace(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(results);
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "place deleted successfully"
        });
      });
    }
  };