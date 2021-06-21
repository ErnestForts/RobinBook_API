const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
  } = require("./user.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign, verify } = require("jsonwebtoken");
  const transporter = require('../_helpers/mailer');

const saltRounds = 10;
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      body.Password = hashSync(body.Password, saltRounds);
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
    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.Email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            auth: false,
            data: results
          });
        }
        const result = compareSync(body.Password, results.Password);
        if (result) {
          results.Password = undefined;
          const jsontoken = sign({ result: results }, process.env.secret, {
            expiresIn: "12h"
          });
          return res.json({
            auth: true,
            token: jsontoken,
            user: results
          });
        } else {
          return res.json({
            auth: false,
            data: "Invalid email or password"
          });
        }
      });
    },
    getUserByUserId: (req, res) => {
      const id = req.params.id;
      getUserByUserId(id, (err, results) => {
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
    getUsers: (req, res) => {
      getUsers((err, results) => {
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
    updateUsers: (req, res) => {
      const body = req.body;
      const id = req.params.id;
      updateUser(body,id, (err, results) => {
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
    deleteUser: (req, res) => {
      const data = req.body;
      console.log(data);
      deleteUser(data, (err, results) => {
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
          message: "user deleted successfully"
        });
      });
    },
    forgotPassword:(req, res) => {
      const {Email} = req.body;
      if(!Email){
        return res.json({
          success: 0,
          message: "Email is required!"
        });
      }
      let verificationLink;
      let emailStatus = 'OK';

      getUserByUserEmail(Email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "User Not Found"
          });
        }
        
        const jsontoken = sign({ result: results }, process.env.secret, {
          expiresIn: "10m"
        });

        verificationLink = `http://localhost:4200/new-password/${jsontoken}`;

        results.resetToken = jsontoken;
        //send mail
        transporter.sendMail({
          from: '<robinbooknotch@gmail.com>',
          to: results.Email, 
          subject: "Forgot Password", 
          html: `<b>Porfavor entra en el siguiente enlce para completar el proceso: </b><a href="${verificationLink}">Link recuperacion!</a>`,
        });

        updateUser(results,results.user_id, (err,results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({emailStatus}); 
        })
      });
    },
    newPassword: (req,res) => {
      const {newPassword} = req.body;
      const resetToken = req.headers.reset;
      let jwtPayload;
      let password = '';

      if(!(newPassword && resetToken)){
        res.status(400).json({message: 'Debes introducir todos los campos!'})
      }

      try{
        jwtPayload = verify(resetToken,process.env.secret);
      }catch(error){
        return res.status(201).json({message: 'wrong token: '+error})
      }

      password = hashSync(newPassword, saltRounds);

      updateUser({Password:password},jwtPayload.result.user_id, (err,results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({message: 'contraseña actualizada'}); 
      });
    }
  };