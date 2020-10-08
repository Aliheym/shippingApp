const fs = require('fs');

const dataFile = `${__dirname}/../data/products.json`;
let products = JSON.parse(fs.readFileSync(dataFile));

module.exports.processProductId = (req, res, next, value) => {
  const productId = parseInt(value);
  const product = products.find(product => product.id === productId);

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid product ID'
    });
  }

  res.locals.product = product;
  res.locals.productId = product.id;

  next();
};

module.exports.checkContentType = (req, res, next) => {
  if (!req.is('json')) {
    return res.status(415).json({
      status: 'fail',
      message: 'Invalid content type: must be application/json'
    });
  }

  next();
};

module.exports.checkBody = (req, res, next) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing title, description or price'
    });
  }

  next();
};

module.exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: products.length,
    data: {
      products
    }
  });
};

module.exports.getProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      product: res.locals.product
    }
  });
};

module.exports.createProduct = (req, res) => {
  const product = createProduct(req.body);
  products = products.concat(product);

  fs.writeFile(dataFile, JSON.stringify(products), err => {
    if (err) return console.error(err);

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  });
};

module.exports.updateProduct = (req, res) => {
  const updatedProduct = updateProduct(res.locals.product, req.body);

  products = products.map(product =>
    product.id === res.locals.productId ? updatedProduct : product
  );

  fs.writeFile(dataFile, JSON.stringify(products), err => {
    if (err) return console.error(err);

    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct
      }
    });
  });
};

module.exports.deleteProduct = (req, res) => {
  products = products.filter(product => product.id !== res.locals.productId);

  fs.writeFile(dataFile, JSON.stringify(products), err => {
    if (err) return console.error(err);

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
};

function createProduct(data) {
  const { title, description, price } = data;
  const id = products[products.length - 1].id + 1;

  return { id, title, description, price };
}

function updateProduct(prevProduct, newProduct) {
  const {
    title = prevProduct.title,
    description = prevProduct.description,
    price = prevProduct.price
  } = newProduct;

  return { ...prevProduct, title, description, price };
}
