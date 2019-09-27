
module.exports = {
    Query: {
        language: () => 'GraphQL',
        getRandomStats: async (_, { character, n }, context) => {
            const res = await context.BlizzardService.getStatsForCharacter(character, n);
            return res.map(stat => {
                return {name, quantity, highest} = stat
            });
        }
    }
}
