const {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace
  } = require("./place.service");
  
  module.exports = {
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
    createPlace: (req, res) => {
      const body = req.body;
      createPlace(body, (err, results) => {
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
    updatePlace: (req, res) => {
      const body = req.body;
      updatePlace(body, (err, results) => {
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