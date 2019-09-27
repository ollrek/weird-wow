const blizzard = require('blizzard.js').initialize({
    key: "97e5dd6e17164506a275eaea54eeaf88",
    secret: "2ZYjzdA3GxDt26MRp2wcrTK4gkNavtHc",
});
const { getRandoms } = require('../tools');

const getStatsForCharacter = async (character, n ) => {
    try {
        await blizzard.getApplicationToken()
            .then(response => {
                blizzard.defaults.token = response.data.access_token
            });
        const item = await blizzard.wow.character(['statistics'], { origin: character.origin, realm: character.realm, name: character.name });
        var stats = item.data.statistics.subCategories;
    } catch (err) {
        throw new Error('Error fetching data from Blizzard API.');
    }

    return getRandoms(stats.reduce(flattenBlizzStats, []), n || 5);
}


// REDUCE : This functions flattens one input array, nested with any numbers of array or objects only keeping real statistics
function flattenBlizzStats(r, a) {
    if (a.hasOwnProperty("quantity")) {
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