let first = new Promise((resolve, reject) => {
  resolve('hello');
})
  .then((res) => {
    console.log('c', res);
    return res + ' world';
  })
  .then((res) => {
    console.log('d', res);
    return res + '!';
  })
  .then((res) => {
    console.log('e', res);
    return new Promise((resolve, reject) => setTimeout(() => reject('bad man'), 1000));
  })
  .then((res) => {
    console.log('f', res);
    return res + 'fffffffk';
  })
  .catch((err) => {
    console.log('err', err);
    throw err;
  });

// setTimeout(() => {
//   console.log('a', first);
// }, 3000);

first.then((res) => {
  console.log('a', res);
})
.catch((err) => {
  console.log('err', err);
});


// let second = new Promise((resolve, reject) => {
//   resolve('hello');
// })
//   .then((res) => {
//     console.log('second', res);
//   });
