const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultResponseTime,
  statusEmailEndpoint,
  contentTypeHeader,
  allowHeaderGet,
  acceptHeader,
  doArraysHaveTheSameElements,
  statusEmailResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specStatusEmail;

const baseUrl = localhost + statusEmailEndpoint;
const endpointTag = { tags: `@endpoint=/${statusEmailEndpoint}` };

Before(endpointTag, () => {
  specStatusEmail = spec();
});

// Scenario: User successfully checks a status of an email smoke type test
Given('User has sent a single email and got requestUID', () => {
  // TODO POST request to /send/email/single and save requestUID from the response to variable
});

Given(
  'User wants to check the status of the email',
  () => 'User wants to check the status of the email'
);

When(
  'User sends {string} request with given {string} as api_key and valid requestUID',
  (method, apiKey) =>
    specStatusEmail
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withHeaders('requestUID', /* requestUID from Given */ '1')
);

When(
  'User selects to see all statuses {string}, {string}, {string}, {string}, {string} and {string}',
  (scheduled, processing, deferred, bounced, notSent, delivered) => {
    specStatusEmail.withQueryParams('status[]', scheduled);
    specStatusEmail.withQueryParams('status[]', processing);
    specStatusEmail.withQueryParams('status[]', deferred);
    specStatusEmail.withQueryParams('status[]', bounced);
    specStatusEmail.withQueryParams('status[]', notSent);
    specStatusEmail.withQueryParams('status[]', delivered);
  }
);

Then(
  'User receives a response from the \\/status\\/email endpoint',
  async () => await specStatusEmail.toss()
);

Then(
  'The \\/status\\/email response should be returned in a timely manner 15000ms',
  () =>
    specStatusEmail.response().to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The \\/status\\/email response should have status 200', () =>
  specStatusEmail.response().to.have.status(200)
);

Then(
  'The \\/status\\/email response should have content-type: application\\/json header',
  () =>
    specStatusEmail
      .response()
      .to.have.headerContains(contentTypeHeader.key, contentTypeHeader.value)
);

Then('The \\/status\\/email response should match json schema', () =>
  chai
    .expect(specStatusEmail._response.json)
    .to.be.jsonSchema(statusEmailResponseSchema)
);

Then(
  'The \\/status\\/email response should have all statuses which the user selected',
  () => {
    const sentStatuses = Object.values(
      specStatusEmail._request.queryParams
    ).toString();
    const sentStatusesArr = sentStatuses.split(',').map(item => {
      return item.trim();
    });

    const receivedStatused = Object.keys(
      specStatusEmail._response.json
    ).toString();
    const receivedStatusedArr = receivedStatused.split(',').map(item => {
      return item.trim();
    });

    chai
      .expect(doArraysHaveTheSameElements(sentStatusesArr, receivedStatusedArr))
      .to.be.equals(true);
  }
);

// Scenario: User successfully checks a status of emails sent in batch smoke type test
// Other Given, When, Then are written in the aforementioned examples
Given('User has sent a batch of emails and got requestUID', () => {
  // TODO POST request to /send/email/batch and save requestUID from the response to variable
});

// Scenario Outline: User successfully checks a status of an email
// Other Given, When, Then are written in the aforementioned examples
When('User selects to fetch the data for: {string}', statuses => {
  const statusArray = statuses.split(',').map(item => {
    return item.trim();
  });

  statusArray.forEach(status =>
    specStatusEmail.withQueryParams('status[]', status)
  );
});

// Scenario Outline: User cannot check the status the single email sent due to unallowed method in the request
// Other Given, When, Then are written in the aforementioned examples
Then(
  'The \\/status\\/email response should have status 405 - Method not allowed',
  () => specStatusEmail.response().to.have.status(405)
);

Then(
  'The \\/status\\/email response should contain Allow header with GET method which is allowed',
  () =>
    specStatusEmail
      .response()
      .to.have.headerContains(allowHeaderGet.key, allowHeaderGet.value)
);

// Scenario Outline: User cannot check the status of emails sent in batch due to unallowed method in the request
// Given, When, Then are written in the aforementioned examples

// Scenario: User is unable to check the status of an email due to missing required api_key in the request
// Other Given, When, Then are written in the aforementioned examples
When('User sends {string} request with valid requestUID', method =>
  specStatusEmail
    .withMethod(method)
    .withPath(baseUrl)
    .withHeaders('Accept', 'application/json')
    .withHeaders('requestUID', /* requestUID from Given */ '1')
);

When(
  'The request is missing an api_key',
  () => 'The request is missing an api_key'
);

// Scenario: User is unable to check the status of an email due to missing required requestUID in the request
// Other Given, When, Then are written in the aforementioned examples
When(
  'User sends {string} request with given {string} as api_key',
  (method, apiKey) =>
    specStatusEmail
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders(acceptHeader.key, acceptHeader.value)
);

When(
  'The request is missing a requestUID',
  () => 'The request is missing a requestUID'
);

// Scenario: User is unable to check the status of an email due to missing required status in the request
// Other Given, When, Then are written in the aforementioned examples
When(
  'User did not select any statuses that he wants to fetch',
  () => 'User did not select any statuses that he wants to fetch'
);

// Scenario: User is unable to check the status of the email due to missing required api_key, requestUID and status in the request
// Other Given, When, Then are written in the aforementioned examples
When(
  'User sends {string} request without required api_key, requestUID and status',
  method =>
    specStatusEmail
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
);

After(endpointTag, () => {
  specStatusEmail.end();
});
