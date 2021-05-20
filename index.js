const axios = require('axios')
const net = require('net')
const fs = require('fs')
// const rateLimit = require("express-rate-limit");
const https = require('https')
const XBoxLiveAuth = require('@xboxreplay/xboxlive-auth')
require('colors')
var express = require('express');


// var options = {

// key: fs.readFileSync("privkey.pem"),
// cert: fs.readFileSync('cert.pem'),

// }

var app = express();
var server = https.createServer(app).listen(443);

// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 60 minutes
//   max: 1, // limit each IP to 100 requests per windowMs
//   message: "You are sending requests too fast :("
// });


// app.use(limiter);

app.use(express.json());
app.use(express.urlencoded());

app.post('/gettoken', async (req, res) => {
	let jbob = req.body

	  let idk = await authenticateAccount(jbob["email"], jbob["password"]);
		console.log(idk);
		res.send({token: idk});
})

let authenticateAccount = async (email, password) => { 
  console.log(email)
  console.log(password)

  const XAuthResponse = await XBoxLiveAuth.authenticate(
      email,
      password,
      {
          XSTSRelyingParty: 'rp://api.minecraftservices.com/'
      }
  ).catch((err) => {
      console.log(err)
      console.log(`Could not authenticate ${email}`.red)
      token = "error"
  })

  let token = axios.post('https://api.minecraftservices.com/authentication/login_with_xbox',
  {
      identityToken: `XBL3.0 x=${XAuthResponse.userHash};${XAuthResponse.XSTSToken}`
  }).then((res) => {
      console.log(`Authenticated ${email}`.green)
			let rek = (res.data.access_token).toString();
			console.log(rek, "this data");
			return rek;
  })
  .catch(err => {
    console.log(err)
    token = "error"
  })
	return token
}



app.listen(8050, () => console.log(`Started server at http://localhost:8050!`));
