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
  deletejob_R,
  updateJob_R,
  clientlist_R,
  managerlist_R,
  updatefile_R,
  deletefile_R

} = require('./resolver');
const { // define db connectors
  updateUser_C,
  loginUser_C,
  changePassword_C,
  joblist_C,
  personlist_C,
  deleteperson_C,
  deletejob_C,
  updateJob_C,
  clientlist_C,
  managerlist_C,
  updatefile_C,
  deletefile_C
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
  type jobphone{
    id:ID
    phoneType:String
    phone:String
  }
  type jobemail{
    id:ID
    emailType:String
    email:String
  }
  type loc{
    name:String
  }
  type contactlist{
    id:ID
    personlist:person
  }
  type assignfilelist{
    id:ID
    jobfile:jobfilelist
  }
  type jobfilelist{
    id:ID
    clientId:ID
    quantity:String
    Commodity:String
    filestatus:String
    fileNo:String
    client:clientlist
    assignmanagetofiles:[assignmanagerlist]
  }
  type clientlist{
    id:ID
    name:String
  }
  type assignmanagerlist{
    id:ID
    accountmanager:accountmanagerlist
  }
  type accountmanagerlist{
    id:ID
    managername:String
  }
  input UpdateuserInput {
    id:ID!
    userName:String!
    gender:String!
    mobile:ID!
    dob:String!
    Address:String
  }
  input jobphoneInput{
    phoneType:String
    phone:String
  }
  input jobemailInput{
    emailType:String
    email:String
  }
  input UpdatejobInput {
    Id:ID!
    jobType:String
    name:String
    ETA:Date
    ETC:Date
    quantity:String
    address:String
    country:String
    state:String
    city:String
    zip:String
    latitude:Float
    longitude:Float
    jobphones:[jobphoneInput]
    jobemails:[jobemailInput] 
  }
  input UpdatefileInput{
    Id:ID
    Commodity:String
    clientId:ID
    quantity:String
    filestatus:String
    assignmanage:[String]
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
    count:ID
    id:ID!
    jobType:String
    name:String
    ETA:Date
    ETC:Date
    quantity:String
    address:String
    country:String
    state:String
    city:String
    zip:String
    latitude:Float
    longitude:Float
    jobphones:[jobphone]
    jobemails:[jobemail]
    location:loc
    assigncontactlists:[contactlist]
    assignfilelists:[assignfilelist]
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
  type getclient{
    id:ID!
    name:String
  }
  type accountmanagerfit{
     accountmanager:getmanager
  }
  type getmanager{
    id:ID!
    managername:String
  }
  type Query {
   loginUser_Q(email:String!,password:String!): [LoginUser]
   clientlist_Q: [getclient]
   managerlist_Q: [accountmanagerfit]
   }
  type Mutation {
    loginUser_M(email:String!,password:String!): [LoginUser]
    updateUser_M(input: UpdateuserInput!): User
    changePassword_M(id:ID!,password:String!): changePassword
    joblist_M(locationId:ID!,offset: ID!,limit: ID!): [Job]
    personlist_M(personId:String!): [person]
    deleteperson_M(Id:String!,JobId:String!): personremove
    deletejob_M(Id:String!): jobremove
    updateJob_M(input: UpdatejobInput!): jobremove
    updatefile_M(input: UpdatefileInput!): jobremove
    deletefile_M(jobId:ID!,fileId:ID): jobremove
  }
`;
const resolvers = {
  Query: {
    loginUser_Q: (_, args, context) => loginUser_R(args, loginUser_C),
    clientlist_Q: (_, args, context) => clientlist_R(context, args, clientlist_C),
    managerlist_Q: (_, args, context) => managerlist_R(context, args, managerlist_C)
  },
  Mutation: {
    loginUser_M: (_, args, context) => loginUser_R(args, loginUser_C),
    updateUser_M: (_, args, context) => updateUser_R(context, args, updateUser_C),
    changePassword_M: (_, args, context) => changePassword_R(context, args, changePassword_C),
    joblist_M: (_, args, context) => joblist_R(context, args, joblist_C),
    personlist_M: (_, args, context) => personlist_R(context, args, personlist_C),
    deleteperson_M: (_, args, context) => deleteperson_R(context, args, deleteperson_C),
    deletejob_M: (_, args, context) => deletejob_R(context, args, deletejob_C),
    updateJob_M: (_, args, context) => updateJob_R(context, args, updateJob_C),
    updatefile_M: (_, args, context) => updatefile_R(context, args, updatefile_C),
    deletefile_M: (_, args, context) => deletefile_R(context, args, deletefile_C),

  }
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });