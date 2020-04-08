import fetch from "node-fetch";

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
module.exports.handler = function(event, context) {
  console.log("queryStringParameters", event.queryStringParameters);
  return fetch("https://covidapi.info/api/v1/global", {
    headers: { Accept: "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from API:", data);
      return {
        statusCode: 200,
        body: JSON.stringify({
          date: data.date,
          recovered: data.result.recovered,
        }),
      };
    });
};

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
