import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {teams, locations} from './db';
import locationType from './locationType';

const teamType = new GraphQLObjectType({
  name: 'Team',
  description: 'An MLB team',
  fields:() => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    locations: {
      type: new GraphQLList(locationType),
      resolve: (team) => {
        const teamLocations = locations.filter(
          // Allow one location to have multiple teams?
          location => location.teamId === team.id
        );
        return teamLocations;
      }
    }
  }),
});

export default teamType;
