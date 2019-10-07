const lodash = require("lodash");

module.exports = {
    Query: {
        getRandomStats: async (_, { character, number }, context) => {
            const res = await context.BlizzardService.getStatsForCharacter(character, number);
            return res.map(async stat => {
                const top = await context.MongooseService.Top.find({ name: stat.name }, function (err, Top) {
                    if (err) console.log(err);
                    return Top;
                });  // Recup tops
                const tmp = top.sort(compare); // Hack for multiline
                const topstat = tmp[0]; // Get topstat
                if (!topstat || topstat.quantity < stat.quantity) {
                    stat.character = lodash.transform(character, function (result, val, key) {
                        result[key] = val.toLowerCase();
                    });
                    if (top) await context.MongooseService.Top.deleteMany({ _id: { $in: top.map(a => a._id) } });
                    const newtop = new context.MongooseService.Top(stat);
                    newtop.save().catch(err => {
                        console.log("Error when saving to database");
                        throw new Error('Error fetching top data from DB.');
                    });
                }
                return {
                    name: stat.name,
                    quantity: stat.quantity,
                    highest: stat.highest,
                    isTop: !topstat || topstat.quantity < stat.quantity
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

function compare(a, b) {
    if (a.quantity < b.quantity) {
        return 1;
    }
    if (a.quantity > b.quantity) {
        return -1;
    }
    return 0;
}