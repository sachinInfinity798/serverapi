const jwt = require('jsonwebtoken');
const { AuthorizationError, noInputError } = require('./../errors/error');

function checkToken(context) {
    //console.log('tok333', context.headers);
    //console.log('----', context.headers['x-access-token']);
    //const token = context.headers.token;
    const token = context.headers['x-access-token'];
    if (!token) {
        throw new AuthorizationError({
            message: `You must supply a JWT for authorization!`
        });
    }
    const decoded = jwt.verify(
        token.replace('Bearer ', ''),
        jwtkey
    );
    return decoded;
}

const authenticateUser_R = (context, connectorQuery) => {
    //return connectorQuery.apply(this, [checkToken(context)]);
};

const loginUser_R = (input, connectorQuery) => {
    if (!input) {
        throw new noInputError({
            message: `You must supply a valid Input!`
        });
    }
    return connectorQuery.apply(this, [input]);
};

const updateUser_R = (context, input, connectorQuery) => {
    input["id"] = checkToken(context).id;
    return connectorQuery.apply(this, [input]);
};

const changePassword_R = (context, input, connectorQuery) => {
    input["id"] = checkToken(context).id;
    return connectorQuery.apply(this, [input]);
};

const joblist_R = (context, input, connectorQuery) => {
    input["id"] = checkToken(context).id;
    return connectorQuery.apply(this, [input]);
};
const personlist_R = (context, input, connectorQuery) => {
    input["id"] = checkToken(context).id;
    return connectorQuery.apply(this, [input]);
};

const deleteperson_R = (context, input, connectorQuery) => {
    input["id"] = checkToken(context).id;
    return connectorQuery.apply(this, [input]);
};

const deletejob_R = (context, input, connectorQuery) => {
    input["id"] = checkToken(context).id;
    return connectorQuery.apply(this, [input]);
};


module.exports = {
    authenticateUser_R,
    updateUser_R,
    loginUser_R,
    changePassword_R,
    joblist_R,
    personlist_R,
    deleteperson_R,
    deletejob_R
};