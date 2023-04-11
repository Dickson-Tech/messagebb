module.exports = {
  localhost: 'http://localhost:3333/',
  defaultResponseTime: 15000,
  callbackEmailEndpoint: 'callback/email',
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
};
