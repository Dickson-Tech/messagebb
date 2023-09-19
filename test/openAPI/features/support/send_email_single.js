const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultResponseTime,
  sendSingleEmailEndpoint,
  contentTypeHeader,
  sendEmailResponseSchema,
  sendEmailSingleRequestBody,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specSendEmailSingle;

const baseUrl = localhost + sendSingleEmailEndpoint;
const endpointTag = { tags: `@endpoint=/${sendSingleEmailEndpoint}` };

Before(endpointTag, () => {
  specSendEmailSingle = spec();
});

// Scenario: User successfully sends an email smoke type test
Given(
  'User wants to send a single email',
  () => 'User wants to send a single email'
);

When(
  'User sends {string} request with given {string} as api_key and required body',
  (method, apiKey) =>
    specSendEmailSingle
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders('Accept', 'application/json')
      .withBody(sendEmailSingleRequestBody)
);

Then(
  'User receives a response from \\/send\\/email\\/single endpoint',
  async () => await specSendEmailSingle.toss()
);

Then(
  'The \\/send\\/email\\/single response should be returned in a timely manner 15000ms',
  () =>
    specSendEmailSingle
      .response()
      .to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The \\/send\\/email\\/single response should have status 200', () =>
  specSendEmailSingle.response().to.have.status(200)
);

Then(
  'The \\/send\\/email\\/single response should have {string}: {string} header',
  (key, value) =>
    specSendEmailSingle
      .response()
      .should.have.headerContains(key, value)
);

Then('The \\/send\\/email\\/single response should match json schema', () =>
  chai
    .expect(specSendEmailSingle._response.json)
    .to.be.jsonSchema(sendEmailResponseSchema)
);

// Scenario Outline: User is unable to send an email due to unallowed method in the request
// Given, When and others Then for this scenario are written in the aforementioned example
Then(
  'The \\/send\\/email\\/single response should have status 405 - Method not allowed',
  () => specSendEmailSingle.response().to.have.status(405)
);

Then(
  'The \\/send\\/email\\/single response should contain Allow header with POST method which is allowed',
  () => specSendEmailSingle.response().to.have.headerContains('allow', 'POST')
);

// Scenario: User is unable to send an email due to missing required api_key in the request
// Given and Then for this scenario are written in the aforementioned example
When('User sends {string} request with required body', method =>
  specSendEmailSingle
    .withMethod(method)
    .withPath(baseUrl)
    .withHeaders('Accept', 'application/json')
    .withBody(sendEmailSingleRequestBody)
);

When(
  'The request is missing an api_key',
  () => 'The request is missing an api_key'
);

// Scenario: User is unable to send an email due to missing required body in the request
// Given and Then for this scenario are written in the aforementioned example
When(
  'User sends {string} request with given {string} as api_key',
  (method, apiKey) =>
    specSendEmailSingle
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders('Accept', 'application/json')
);

When('The request is missing a body', () => 'The request is missing a body');

// Scenario: User is unable to send an email due to missing required api_key and body in the request
// Given and Then for this scenario are written in the aforementioned example
When('User sends {string} request without required body and api_key', method =>
  specSendEmailSingle
    .withMethod(method)
    .withPath(baseUrl)
    .withHeaders('Accept', 'application/json')
);

After(endpointTag, () => {
  specSendEmailSingle.end();
});
