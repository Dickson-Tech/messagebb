module.exports = {
  localhost: 'http://localhost:3333/',
  defaultResponseTime: 15000,
  statusEmailEndpoint: 'status/email',
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  allowHeader: {
    key: 'allow',
    value: 'POST',
  },
  acceptHeader: {
    key: 'Accept',
    value: 'application/json',
  },
  statusEmailResponseSchema: {
    type: 'object',
    properties: {
      scheduled: { type: 'number' },
      processing: { type: 'number' },
      deferred: { type: 'number' },
      bounced: { type: 'number' },
      'not sent': { type: 'number' },
      delivered: { type: 'number' },
    },
  },
  doArraysHaveTheSameElements: (array1, array2) => {
    if (array1.length === array2.length) {
      return array1.every(element => {
        if (array2.includes(element)) {
          return true;
        }

        return false;
      });
    }

    return false;
  },
};
