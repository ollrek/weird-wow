
module.exports = {
    Query: {
        language: () => 'GraphQL',
        getRandomStats: async (_, { character, n }, context) => {
            console.log(character);
            const res = await context.BlizzardService.getStatsForCharacter(character, n);
            return res.map(stat => {
                return {name, quantity, highest} = stat
            });
        }
    }
}
