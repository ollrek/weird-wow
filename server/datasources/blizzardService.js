const { getRandoms } = require('../tools');

const getStatsForCharacter = async (character, n ) => {
    try {
        const blizzard = await require('blizzard.js').wow.createInstance({
            key: "97e5dd6e17164506a275eaea54eeaf88",
            secret: "2ZYjzdA3GxDt26MRp2wcrTK4gkNavtHc",
        });

        const item = await blizzard.characterAchievements({name:"rokk", realm:"dalaran", origin:"eu", stats:true});
        var stats = item.data.categories;
    } catch (err) {
        throw new Error('Error fetching data from Blizzard API : ' + err);
    }

    return getRandoms(stats.reduce(flattenBlizzStats, []), n || 5);
}


// REDUCE : This functions flattens one input array, nested with any numbers of array or objects only keeping real statistics
function flattenBlizzStats(r, a) {
    if (a.hasOwnProperty("quantity") && a.quantity > 0) {
        r.push(a);
    }
    else if (a.id == 14807) { // Hack for D&R
        return [...a.statistics || []].reduce(flattenBlizzStats, r);
    }
    else {
        return [...a.statistics || [], ...a.subCategories || []].reduce(flattenBlizzStats, r);
    }
    return r;
}

module.exports = {
    getStatsForCharacter
}