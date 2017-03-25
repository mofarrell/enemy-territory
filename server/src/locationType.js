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
    groupName: {
      type: GraphQLString,
      resolve: (location) => {
        if (location.groupName !== null) {
          return location.groupName;  
        }
        const team = teams[location.teamId];
        const teamName = team.name;
        const names = ['Fans', 'Party Ppl!', 'Backers', 'Lovers'];
        return teamName + ' ' + names[Math.floor(Math.random() * names.length)];
      }
    },
    message: {
      type: GraphQLString,
      resolve: (location) => {
        if (location.message !== null) {
          return location.message;
        }
        return 'Let\'s watch the game! PARTY!1!11!';
      }
    },
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
    message: {type: GraphQLString},
  }),
});

export default locationType;
