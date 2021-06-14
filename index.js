/**
 * Required External Modules
 */

 const express = require("express");
 var cors = require('cors');
 const path = require("path");
 
 const expressSession = require("express-session");
 const passport = require("passport");
 const Auth0Strategy = require("passport-auth0");
 
 require("dotenv").config();

 /**
 * App Variables
 */

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || "3000";

/**
 * Session Configuration (New!)
 */

 const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
  };
  
  if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
  }



/**
 * Passport Configuration (New!)
 */



/**
 *  App Configuration
 */

 app.get('/home', function (req, response) {
    response.send(res);
});
