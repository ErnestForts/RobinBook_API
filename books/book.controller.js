const {
  getBook,
  getBookById,
  createBook,
  updateBook,
  deleteBook
  } = require("./book.service");

const saltRounds = 10;
  
  module.exports = {
    createBook: (req, res) => {
      const body = req.body;
      console.log(body.Nombre);
      createBook(body, (err, results) => {
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
    getBookById: (req, res) => {
      const id = req.params.id;
      getBookById(id, (err, results) => {
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
    getBook: (req, res) => {
      getBook((err, results) => {
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
    updateBook: (req, res) => {
      const body = req.body;
      updateBook(body, (err, results) => {
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
    deleteBook: (req, res) => {
      const data = req.body;
      console.log(data);
      deleteBook(data, (err, results) => {
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