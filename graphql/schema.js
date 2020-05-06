const { makeExecutableSchema } = require('graphql-tools');
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var { buildSchema } = require('graphql');
const { // define resolvers
  authenticateUser_R,
  loginUser_R,
  updateUser_R,
  changePassword_R,
  joblist_R,
  personlist_R,
  deleteperson_R,
  deletejob_R

} = require('./resolver');
const { // define db connectors
  updateUser_C,
  loginUser_C,
  changePassword_C,
  joblist_C,
  personlist_C,
  deleteperson_C,
  deletejob_C
} = require('./connection');

const typeDefs = `
  type User {
    id: ID!
    userName:String!
    gender:String!
    mobile:String!
    dob:String!
    Address:String!
  }
  scalar Date
  type changePassword{
    id:ID
  }
  type loc{
    name:String
  }
  type contactlist{
    id:ID
    personlist:person
  }
  input UpdateuserInput {
    id:ID!
    userName:String!
    gender:String!
    mobile:ID!
    dob:String!
    Address:String
  }
  type UserExists {
    name: String!
    email: String!
    roles: [String]!
  }
  type LoginUser {
    token: String!
    id:ID!
    locationID:ID!
    userName:String
    email:String!
    pwd:String
    gender:String
    mobile:String
    dob:String
    Address:String
    status:Int
    permission:String
    locationName:String
  }
  type Job {
    id:ID!
    jobType:String
    name:String
    ETA:Date
    ETC:Date
    quantity:String
    location:loc
    assigncontactlists:[contactlist]
  }
  type person {
    id:ID!
    name:String
    address:String
    email:String
    contactNumber:String
    company:String
  }
  type Token {
    token: String!
  }
  type personremove{
    id:ID
  }
  type jobremove{
    id:ID
  }
  type Query {
   loginUser_Q(email:String!,password:String!): [LoginUser]
   }
  type Mutation {
    loginUser_M(email:String!,password:String!): [LoginUser]
    updateUser_M(input: UpdateuserInput!): User
    changePassword_M(id:ID!,password:String!): changePassword
    joblist_M(locationId:ID!): [Job]
    personlist_M(personId:String!): [person]
    deleteperson_M(Id:String!,JobId:String!): personremove
    deletejob_M(Id:String!): jobremove
  }
`;
const resolvers = {
  Query: {
    loginUser_Q: (_, args, context) => loginUser_R(args, loginUser_C)
  },
  Mutation: {
    loginUser_M: (_, args, context) => loginUser_R(args, loginUser_C),
    updateUser_M: (_, args, context) => updateUser_R(context, args, updateUser_C),
    changePassword_M: (_, args, context) => changePassword_R(context, args, changePassword_C),
    joblist_M: (_, args, context) => joblist_R(context, args, joblist_C),
    personlist_M: (_, args, context) => personlist_R(context, args, personlist_C),
    deleteperson_M: (_, args, context) => deleteperson_R(context, args, deleteperson_C),
    deletejob_M: (_, args, context) => deletejob_R(context, args, deletejob_C),

  }
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });