const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultResponseTime,
  sendBatchEmailsEndpoint,
  contentTypeHeader,
  sendEmailResponseSchema,
  sendEmailSingleRequestBody,
  jsonToBase64,
  batchRecipientInfo,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specSendEmailBatch;

const baseUrl = localhost + sendBatchEmailsEndpoint;
const endpointTag = { tags: `@endpoint=/${sendBatchEmailsEndpoint}` };

Before(endpointTag, () => {
  specSendEmailBatch = spec();
});

// Scenario: User successfully sends a batch email smoke type test
Given(
  'User wants to send a batch emails',
  () => 'User wants to send a batch emails'
);

When(
  'User sends {string} request to \\/send\\/email\\/batch url with given {string} as api_key and required body',
  (method, apiKey) => {
    sendEmailSingleRequestBody.recipientInfo = {
      batchEmailAsBase64: jsonToBase64(batchRecipientInfo),
    };

    specSendEmailBatch
      .withMethod(method)
      .withPath(baseUrl)
      .withHeaders('api_key', apiKey)
      .withHeaders('Accept', 'application/json')
      .withBody(sendEmailSingleRequestBody);
  }
);

Then(
  'User receives a response from \\/send\\/email\\/batch endpoint',
  async () => await specSendEmailBatch.toss()
);

Then(
  'The \\/send\\/email\\/batch response should be returned in a timely manner 15000ms',
  () =>
    specSendEmailBatch
      .response()
      .to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The \\/send\\/email\\/batch response should have status 200', () =>
  specSendEmailBatch.response().to.have.status(200)
);

Then(
  'The \\/send\\/email\\/batch response should have {string}: {string} header',
  (key, value) =>
    specSendEmailBatch
      .response()
      .should.have.headerContains(key, value)
);

Then('The \\/send\\/email\\/batch response should match json schema', () =>
  chai
    .expect(specSendEmailBatch._response.json)
    .to.be.jsonSchema(sendEmailResponseSchema)
);

// Scenario Outline: User is unable to send a batch emails due to unallowed method in the request
// Given, When and others Then for this scenario are written in the aforementioned example
Then(
  'The \\/send\\/email\\/batch response should have status 405 - Method not allowed',
  () => specSendEmailBatch.response().to.have.status(405)
);

Then(
  'The \\/send\\/email\\/batch response should contain Allow header with POST method which is allowed',
  () => specSendEmailBatch.response().to.have.headerContains('allow', 'POST')
);

After(endpointTag, () => {
  specSendEmailBatch.end();
});
