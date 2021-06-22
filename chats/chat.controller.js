const {
  getChats,
  createChat,
  getchatsById,
  createMensaje,
  getMensaje,
  updateBook,
  deleteBook,
  insertBookFav,
  getBookFav,
  deleteBookFav,
  likeComent,
  puntuarLibro,
  getValorarLibro
  } = require("./chat.service");
  const transporter = require('../_helpers/mailer');
  
  module.exports = {
    getChats: (req, res) => {
      getChats((err, results) => {
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
    createChat: (req, res) => {
      const body = req.body;
      createChat(body, (err, results) => {
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
    getchatsById: (req, res) => {
      const id = req.params.id;
      getchatsById(id, (err, results) => {
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
    createMensaje: (req, res) => {
      const body = req.body;
      createMensaje(body, (err, results) => {
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
    getMensaje: (req, res) => {
      const id = req.params.id;
      getMensaje(id, (err, results) => {
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
          message: "Book deleted successfully"
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
    getBookFav: (req, res) => {
      const id = req.params.id;
      getBookFav(id, (err, results) => {
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
    insertBookFav: (req, res) => {
      const body = req.body;
      insertBookFav(body, (err, results) => {
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
    deleteBookFav: (req, res) => {
      const data = req.body;
      console.log(data);
      deleteBookFav(data, (err, results) => {
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
          message: "Book deleted favorite successfully"
        });
      });
    },
    puntuarLibro: (req, res) => {
      const body = req.body;
      puntuarLibro(body, (err, results) => {
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
    enviarMail: (req, res) => {
      const body = req.body;
      let emailStatus = "OK";
      transporter.sendMail({
        from: '<robinbooknotch@gmail.com>',
        to: body.email, 
        subject: "Te han recomendado un libro", 
        html: `<p>Saludos de ${body.name}, usuario de la aplicación de <b>RobinBook</b> te ha recomendado el siguiente libro: ${body.title}!</p>`,
      });
      res.send({emailStatus});
    },
    getValorarLibro: (req, res) => {
      const id = req.params.id;
      getValorarLibro(id, (err, results) => {
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