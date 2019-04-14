module.exports = function googleEncrypt(req, res, next) {
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        req.body.email = payload.email
        req.body.name = payload.name
        next()
    }
    verify().catch(console.error);
}