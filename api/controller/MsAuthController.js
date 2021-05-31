const XBoxLiveAuth = require('@xboxreplay/xboxlive-auth')
const axios = require('axios')

const authenticateAccount = async (req, res) => {
    let { email, password } = req.body

    if(!email || !password) return res.status(400).send({
        error: `BAD_REQUEST`,
        message: `The body provided did not match the criteria for this endpoint`
    })

    const XAuthResponse = await XBoxLiveAuth.authenticate(
        email,
        password,
        {
            XSTSRelyingParty: 'rp://api.minecraftservices.com/'
        }
    ).catch((err) => {
        res.status(400).send({
            error: `UNAUTHORIZED`,
            message: `The provided account credentials were incorrect`
        })
    })

    if(XAuthResponse != undefined) {
        axios.post('https://api.minecraftservices.com/authentication/login_with_xbox',
        {
            identityToken: `XBL3.0 x=${XAuthResponse.userHash};${XAuthResponse.XSTSToken}`
        }).then((response) => {
            return res.status(200).send(response.data)
        })  
    }
}

module.exports = {
    authenticateAccount
}