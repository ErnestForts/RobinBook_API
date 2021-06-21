const {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  createComent,
  insertPlaceFav,
  getPlaceFav,
  deletePlaceFav,
  getComent,
  likeComent,
  puntuarLugar,
  getPuntuaciones,
  puntuarLugar
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
  },
  createComent: (req, res) => {
    const body = req.body;
    createComent(body, (err, results) => {
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
  getComent: (req, res) => {
    const id = req.params.id;
    getComent(id, (err, results) => {
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
  likeComent: (req, res) => {
    const body = req.body;
    likeComent(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "like updated successfully"
      });
    });
  },
  getPlaceFav: (req, res) => {
    const id = req.params.id;
    getPlaceFav(id, (err, results) => {
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
  insertPlaceFav: (req, res) => {
    const body = req.body;
    insertPlaceFav(body, (err, results) => {
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
    })

  },
  deletePlaceFav: (req, res) => {
    const data = req.body;
    console.log(data);
    deletePlaceFav(data, (err, results) => {
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
        message: "Deleted place from your favorite, successfully"
      });
    });
  },
  puntuarLugar: (req, res) => {
    const body = req.body;
    puntuarLugar(body, (err, results) => {
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
  getPuntuaciones: (req, res) => {
    const id = req.params.id;
    getPuntuaciones(id, (err, results) => {
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

  }
};