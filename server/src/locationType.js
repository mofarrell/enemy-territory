import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';
import {teams, locations} from './db';
import teamType from './teamType';

export const locationType = new GraphQLObjectType({
  name: 'Location',
  description: 'A place to watch a baseball game!',
  fields:() => ({
    id: {
      type: GraphQLString,
      resolve: (location) => `location-${location.latitude}-${location.longitude}`,
    },
    latitude: {type: GraphQLString},
    longitude: {type: GraphQLString},
    name: {type: GraphQLString},
    groupName: {type: GraphQLString},
    message: {type: GraphQLString},
    teamId: {type: GraphQLString},
    team: {
      type: teamType,
      resolve: (location) => {
        return teams[location.teamId];
      }
    }
  }),
});

export const locationInputType = new GraphQLInputObjectType({
  name: 'LocationInput',
  fields:() => ({
    latitude: {type: GraphQLString},
    longitude: {type: GraphQLString},
    teamId: {type: GraphQLString},
    name: {type: GraphQLString},
    groupName: {type: GraphQLString},
    message: {
      type: GraphQLString,
      resolve: (location) => {
        if (location.message !== null) {
          return location.message;
        }
        return 'Come watch the game tonight! LET\'S PARTY!1!!';
      }
    },      
  }),
});

export default locationType;
