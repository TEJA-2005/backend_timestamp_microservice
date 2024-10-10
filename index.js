// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/',(req,res)=>{

  const date = new Date();
  res.json({unix:date.getTime(),utc:date.toUTCString()});

});

app.get('/api/:date', (req, res) => {
  const dt = req.params.date;
  let date;

  // Check if the parameter is a Unix timestamp in milliseconds
  if (!isNaN(dt) && dt.length === 13) {
    date = new Date(parseInt(dt));
  } else if (!isNaN(dt)) {
    // If it's a Unix timestamp in seconds, convert to milliseconds
    date = new Date(parseInt(dt) * 1000);
  } else {
    // Otherwise, assume it's an ISO date string
    date = new Date(dt);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ "error": "Invalid Date" });
  } else {
    res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  }
});




// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
