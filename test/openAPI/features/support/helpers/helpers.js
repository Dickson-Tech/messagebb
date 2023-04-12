const jsonToBase64 = jsonObj => {
  const jsonString = JSON.stringify(jsonObj);
  return Buffer.from(jsonString).toString('base64');
};

module.exports = {
  jsonToBase64,
  localhost: 'http://localhost:3333/',
  defaultResponseTime: 15000,
  callbackEmailEndpoint: 'callback/email',
  sendSingleEmailEndpoint: 'send/email/single',
  sendBatchEmailsEndpoint: 'send/email/batch',
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  allowHeaderPost: {
    key: 'allow',
    value: 'POST',
  },
  allowHeaderGet: {
    key: 'allow',
    value: 'GET',
  },
  acceptHeader: {
    key: 'Accept',
    value: 'application/json',
  },
  sendEmailResponseSchema: {
    type: 'object',
    properties: {
      response: { type: 'string' },
      requestUID: { typep: 'string' },
    },
  },
  sendEmailSingleRequestBody: {
    callback: {
      URI: 'https://example.com/callback/emails/requestUID',
    },
    senderInfo: {
      organisationName: 'Example Medical Insitution',
      organisationRegNr: 'GOV1234567890',
      onBehalfOfName: 'Example Medical Insitution',
      onBehalfOfRegNr: 'GOV1234567890',
      email: 'sender@example.com',
      replyTo: 'reply-to@example.com',
      name: 'Example Doctor',
    },
    recipientInfo: {
      email: 'customer@example.com',
      emailCC: 'customer-cc@example.com',
      emailBCC: 'customer-bcc@example.com',
      name: 'Example Customer',
    },
    emailContent: {
      encoding: 'UTF-8',
      title: 'Example Title Of An Email',
      content: 'Example Customer',
    },
  },
  batchRecipientInfo: [
    {
      recipientInfo: {
        email: 'customer@example.com',
        emailCC: 'customer-cc@example.com',
        emailBCC: 'customer-bcc@example.com',
        name: 'Example Customer',
      },
    },
    {
      recipientInfo: {
        email: 'dear-customer@example.com',
        name: 'Unknown Customer',
      },
    },
  ],
};
