// const request = require('request');
const blizzard = require('blizzard.js').initialize({
    key: "97e5dd6e17164506a275eaea54eeaf88",
    secret: "2ZYjzdA3GxDt26MRp2wcrTK4gkNavtHc",
    // origin: 'us', // optional
    // locale: 'en_US', // optional
    // token: '' // optional
});

module.exports = {
    getStats: function (req, res) {

        try {
            await blizzard.getApplicationToken()
                .then(response => {
                    blizzard.defaults.token = response.data.access_token
                });
            const item = await blizzard.wow.item({ id: 168185 });
            console.log(item)
        } catch (err) {
            console.error(err);
        }

        // req.pipe(request(url).on('error', error => {
        //     res.status(502).send(error.message);
        // })).pipe(res);
    },
}
