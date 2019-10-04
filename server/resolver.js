const lodash = require("lodash");

module.exports = {
    Query: {
        getRandomStats: async (_, { character, n }, context) => {
            const res = await context.BlizzardService.getStatsForCharacter(character, n);
            return res.map(async stat => {
                var res = await context.MongooseService.Top.find({ name: stat.name }, function (err, Top) {
                    if (err) console.log(err);
                    return Top;
                });
                res = res[0];
                if (!res || res.quantity < stat.quantity) {
                    stat.character = lodash.transform(character, function (result, val, key) {
                        result[key] = val.toLowerCase();
                    });
                    const top = new context.MongooseService.Top(stat);
                    top.save().catch(err => {
                        console.log("Error when saving to database");
                        throw new Error('Error fetching top data from DB.');
                    });
                }
                return {
                    name: stat.name,
                    quantity: stat.quantity,
                    highest: stat.highest,
                    isTop: !res || res.quantity < stat.quantity
                }
            });
        },
        tops: async (_, { }, context) => {
            const res = await context.MongooseService.Top.find({}, function (err, Tops) {
                if (err) console.log(err);
                return Tops;
            });

            return res.map(top => {
                return {
                    stat: {
                        name: top.name,
                        quantity: top.quantity,
                        highest: top.highest,
                    }, character: top.character
                };
            });
        }
    },
}
