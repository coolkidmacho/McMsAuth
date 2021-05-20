# McMsAuth
## An authorization api for minecraft!

### Installation


First install nodejs https://nodejs.org/en/

Then, install the required dependencies:
```sh
npm i axios express-rate-limit @xboxreplay/xboxlive-auth express colors
```

### Usage

```sh
node index.js
```

Now you can connect to you server on localhost port 8050!

Send a post request to your localhost 8050 port with your data in this format.
```
import requests

data =  {
    "email": "coolswagemail@example.com",
    "password": "MyPassword123"
}

c = requests.post("localhost:8050", data)
print(c.content)

this will return a json!
```

credits https://github.com/Alfredo-Developer
for part of the authentication code!
