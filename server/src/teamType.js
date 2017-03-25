import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {teams, locations} from './db';
import {teamData} from './teamData';
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
    },
    venue: {
      type: GraphQLString,
      resolve: (team) => {
        const teamDataEntry = getTeamData(team);
        return teamDataEntry ? teamDataEntry.venue_name : null;
      }
    },
    team_url: {
      type: GraphQLString,
      resolve: (team) => {
        const teamDataEntry = getTeamData(team);
        return teamDataEntry ? teamDataEntry.base_url : null;
      }
    },
    first_year_of_play: { 
      type: GraphQLString,
      resolve: (team) => {
        const teamDataEntry = getTeamData(team);
        return teamDataEntry ? teamDataEntry.first_year_of_play : null;
      }
    },
    division: { 
      type: GraphQLString,
      resolve: (team) => {
        const teamDataEntry = getTeamData(team);
        return teamDataEntry ? teamDataEntry.division_full : null;
      }
    },
    primary_color: { 
      type: GraphQLString,
      resolve: (team) => team.primaryColor,
    },
    secondary_color: { 
      type: GraphQLString,
      resolve: (team) => team.secondaryColor,
    },
    logo: {type: GraphQLString},
  }),
});

function getTeamData(team) {
  return teamData.team_all.queryResults.row.find(
    row => row.name_display_full === team.name || row.name_abbrev === team.id
  );
}


export default teamType;
