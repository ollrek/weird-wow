module.exports = {
    getStats: function (req, res) {
        var url = "https://www.mocky.io/v2/5185415ba171ea3a00704eed";
        // var url = "www.google.com" + req.url;
        req.pipe(request(url)).pipe(res);
    },
}