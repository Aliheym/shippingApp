const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const productRouter = require('./routes/productRouter');

app.use('/api/products', productRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
