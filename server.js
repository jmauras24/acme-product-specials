const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Product } = db.models;

app.use(require('body-parser').json())
app.use('/dist', express.static(path.join(__dirname,'dist')));
app.get('/',(req, res , next) => res.sendFile(path.join(__dirname,'index.html')));

app.get('/api/products',(req, res, next) => {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next)
})

app.get('/api/products:id',(req, res, next) => {
  Product.findById(req.params.id)
    .then( product =>{
      Object.assign(product, req.body);
      return product.save();
    })
    .then(product => res.send(product))
    .catch(next)
})

const port = process.env.PORT || 1337;

app.listen(port, ()=> console.log(`listening on port ${port}`));

db.sync()
  .then(() => db.seed());
