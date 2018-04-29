const jwt = require("jsonwebtoken");

module.exports.auth = function(event, context, callback) {
  //   console.log(event.headers["X-Nf-Sign"]);
  const token = event.headers["X-Nf-Sign"];
  try {
    var decoded = jwt.verify(token, "testing");
    console.log(decoded);
  } catch (err) {
    console.log(err);
    callback(null, denyPolicy("anonymous", event.methodArn));
  }
  callback(null, allowPolicy("ajschmidt.com", event.methodArn));
};

const denyPolicy = function(principalId, resource) {
  return generatePolicy(principalId, "Deny", resource);
};

const allowPolicy = function(principalId, resource) {
  return generatePolicy(principalId, "Allow", resource);
};

const generatePolicy = function(principalId, effect, resource) {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = "2012-10-17"; // default version
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = "execute-api:Invoke"; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};
