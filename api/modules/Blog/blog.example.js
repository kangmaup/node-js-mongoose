const { now } = require('mongoose');
const { articleModel } = require('./blog.model');

const dog = new articleModel({
  title: 'example',
  author: 'joko',
  body: 'Ini contoh gaes',
  comments: [{}],
});

console.log(dog);
