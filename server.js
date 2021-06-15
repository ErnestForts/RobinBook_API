require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require("./users/user.router");
const placeRouter = require("./places/place.router");
const bookRouter = require("./books/book.router");


app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/place", placeRouter);
app.use("/book", bookRouter);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));