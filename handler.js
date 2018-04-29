'use strict';

module.exports.hello = (event, context, callback) => {
  // console.log('event', event);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `This is a serverless response!. Env: ${process.env.ENVIRONMENT}`,
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
