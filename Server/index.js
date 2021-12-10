const express = require ('express');
const {pool} = require('./db')
const url = require ('url');
//added for branch n//
const PORT = 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening at localhost: ${PORT}` )
});
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
})
app.get('/products', (req, res) => {
  let page = 1;
  let count =5;
  console.log(req.query)
  if(req.query.page) {
    page = parseInt(req.query.page)
  }
  if(req.query.count) {
    count = parseInt(req.query.count)
  }
offsetNum = (page - 1) * count
  pool.query(`select * from product limit ${count} offset ${offsetNum}`, (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })

})
app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;

  pool.query(`select * from product where id = ${productId} `,(err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  pool.query(`select * from style where product_id = ${productId} `,(err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
})


})
 app.get('/products/:product_id/related', (req, res) => {
   const productId = req.params.product_id;
  pool.query(`select related_product_id from related where product_id  = ${productId}`)
  .then(result => {
    relatedProductIds = []
    for (let i = 0;  i < result.rows.length; i++) {
      relatedProductIds.push(result.rows[i].related_product_id)
    }
    res.status(200).send(relatedProductIds)
  })
  .catch(err => {
    throw err;
  })
})
