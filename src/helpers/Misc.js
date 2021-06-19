const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const promiseTimeout = (promise, ms) => {
  let id;

  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      reject("Timed out in " + ms + "ms.");
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]).then((result) => {
    clearTimeout(id);

    return result;
  });
};

const expiredUnixTime = (expireTime) => {
  const time = Math.floor(new Date() / 1000);

  return time > expireTime;
};

const executeAllPromises = (promises) => {
  // Wrap all Promises in a Promise that will always "resolve"
  var resolvingPromises = promises.map(function (promise) {
    return new Promise(function (resolve) {
      var payload = new Array(2);
      promise
        .then(function (result) {
          payload[0] = result;
        })
        .catch(function (error) {
          payload[1] = error;
        })
        .then(function () {
          resolve(payload);
        });
    });
  });

  var errors = [];
  var results = [];

  // Execute all wrapped Promises
  return Promise.all(resolvingPromises).then(function (items) {
    items.forEach(function (payload) {
      if (payload[1]) {
        errors.push(payload[1]);
      } else {
        results.push(payload[0]);
      }
    });

    return {
      errors: errors,
      results: results,
    };
  });
};

export default {
  sleep,
  promiseTimeout,
  expiredUnixTime,
  executeAllPromises,
};
