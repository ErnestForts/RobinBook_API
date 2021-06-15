require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require("./users/user.router");
const placesRouter = require("./places/places.router");


app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/book", placesRouter);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));