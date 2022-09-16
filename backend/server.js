require('dotenv').config({path: '.env'})
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");


const PORT = process.env.PORT || 3500;



// json
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/photos',require('./routes/photo'))

// urlencoded
app.use(express.urlencoded({extended: false}));


app.use(verifyJWT);
// routers
app.use("/email", require("./routes/email"))

// logger
app.use(logger)

app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({"error": "404 Not Found"});
	} else {
		res.type('txt').send("404 Not Found");
	}
});

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
