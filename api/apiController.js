var request = require('request');

module.exports = {
    getStats: function (req, res) {
        var url = "https://www.google.com";
        req.pipe(request(url).on('error', error => {
            res.status(502).send(error.message);
        })).pipe(res);
    },
}
