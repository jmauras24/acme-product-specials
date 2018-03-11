const conn = require('./conn');
const Product = require('./Product');


const sync = () => {
  return conn.sync({ force: true});
}

const seed = () =>{
  return Promise.all([
    Product.create({ name: 'car'}),
    Product.create({ name: 'book'}),
    Product.create({ name: 'cologne'}),
    Product.create({ name: 'iphone', isSpecial: true}),
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    Product
  }
}
