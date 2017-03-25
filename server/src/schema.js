import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {teams, locations} from './db';
import {locationType, locationInputType} from './locationType';
import teamType from './teamType';

const rootFields = {
  teams: {
    type: new GraphQLList(teamType),
    resolve: _ => {
      return teams;
    },
  },
  locations: {
    type: new GraphQLList(locationType),
    resolve: _ => {
      return locations;
    },
  },
  teamByID: {
    type: teamType,
    args: {
      id: {
        type: GraphQLString,
      }
    },
    resolve: (object, {id}, context, info) => {
      return teams.find(team => team.id == id);
    }
  },
  // Hack - doing the mutation as a root field :(
  addLocation: {
    type: locationType,
    args: {
      location: {
        type: locationInputType,
      }
    },
    resolve: (object, {location}) => {
      locations.push(location);
      return location;
    }
  },
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryRoot',
    fields: rootFields,
  }),
});

export default schema;
