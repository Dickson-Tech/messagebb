const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultResponseTime,
  callbackEmailEndpoint,
  sendSingleEmailEndpoint,
  sendBatchEmailsEndpoint,
  sendEmailSingleRequestBody,
  allowHeaderPost,
  acceptHeader,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specCallbackEmail;
let specSendEmail;

let requestUID;

const baseUrl = localhost + callbackEmailEndpoint;
const singleEmailUrl = localhost + sendSingleEmailEndpoint;
const batchEmailUrl = localhost + sendBatchEmailsEndpoint;
const endpointTag = { tags: `@endpoint=/${callbackEmailEndpoint}` };

Before(endpointTag, () => {
  specCallbackEmail = spec();
  specSendEmail = spec();
});

// Scenario: Callback endpoint successfully responds to an email sent via Messaging BB smoke type test
Given(
  'Single email with given {string} as api_key and valid payload is sent and returns requestUID, for example {string}',
  async (apiKey, exampleRequestUID) => {
    specSendEmail
      .post(singleEmailUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withBody(sendEmailSingleRequestBody);

    await specSendEmail.toss();

    requestUID = specSendEmail._response.json.requestUID;
    requestUID = requestUID === undefined ? '' : requestUID;

    chai.expect(requestUID.length).to.be.greaterThan(0);
  }
);

When(
  '{string} request with given {string} as api_key and valid requestUID, for example {string}, in the headers is sent',
  (method, apiKey, exampleRequestUID) =>
    specCallbackEmail
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withHeaders('requestUID', requestUID)
);

When(
  'The request contains {string} as meta and {string} as content in the payload',
  (meta, content) =>
    specCallbackEmail.withBody({
      meta: meta,
      content: content,
    })
);

Then(
  'The response from the \\/callback\\/email endpoint is received',
  async () => await specCallbackEmail.toss()
);

Then(
  'The \\/callback\\/email response should be returned in a timely manner 15000ms',
  () =>
    specCallbackEmail
      .response()
      .to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The \\/callback\\/email response should have status 200', () =>
  specCallbackEmail.response().to.have.status(200)
);

Then('The \\/callback\\/email response should have {string}: {string} header',
  (key, value) =>
    specCallbackEmail
      .response()
      .should.have.headerContains(key, value)
);

// Scenario: Callback endpoint successfully responds to a batch of emails sent via Messaging BB smoke type test
// Others Given, When, Then for this scenario are written in the aforementioned example
Given(
  'Batch of emails with given {string} as api_key and valid payload is sent and returns requestUID, for example {string}',
  async (apiKey, exampleRequestUID) => {
    specSendEmail
      .post(batchEmailUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withBody(sendEmailSingleRequestBody);

    await specSendEmail.toss();

    requestUID = specSendEmail._response.json.requestUID;
    requestUID = requestUID === undefined ? '' : requestUID;

    chai.expect(requestUID.length).to.be.greaterThan(0);
  }
);

// Scenario Outline: Callback endpoint successfully responds to an email sent via Messaging BB
// Given, When, Then for this scenario are written in the aforementioned example

// Scenario Outline: Callback endpoint is unable to respond to an email sent via Messaging BB due to unallowed method in the request
// Others Given, When, Then for this scenario are written in the aforementioned example
Then(
  'The \\/callback\\/email response should have status 405 - Method not allowed',
  () => specCallbackEmail.response().to.have.status(405)
);

Then(
  'The \\/callback\\/email response should contain Allow header with POST method which is allowed',
  () =>
    specCallbackEmail
      .response()
      .to.have.headerContains(allowHeaderPost.key, allowHeaderPost.value)
);

// Scenario: Callback endpoint is unable to respond to an email sent via Messaging BB due to missing api_key header in the request
// Others Given, When, Then for this scenario are written in the aforementioned example
When(
  '{string} request with given valid requestUID, for example "btpn-aiqu-urw8-94zm-h0av-vjhl", in the header is sent',
  method =>
    specCallbackEmail
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders(acceptHeader.key, acceptHeader.value)
      .withHeaders('requestUID', requestUID)
);

When(
  'The request is missing required api_key in the header',
  () => 'missing api_key header'
);

// Scenario: Callback endpoint is unable to respond to an email sent via Messaging BB due to missing requestUID header in the request
// Others Given, When, Then for this scenario are written in the aforementioned example
Given(
  'Callback endpoint is called without required requestUID',
  () => 'Callback endpoint is called without required requestUID'
);

When(
  '{string} request with given {string} as api_key in the header is sent',
  (method, apiKey) =>
    specCallbackEmail
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders(acceptHeader.key, acceptHeader.value)
);

When(
  'The request is missing required requestUID in the header',
  () => 'missing requestUID header'
);

// Scenario: Callback endpoint is unable to respond to an email sent via Messaging BB due to missing payload in the request
// Others Given, When, Then for this scenario are written in the aforementioned example
When('The request is missing required payload', () => 'missing payload');

After(endpointTag, () => {
  specCallbackEmail.end();
  specSendEmail.end();
});
