const express = require ('express');
const pool = require('./db')
const url = require ('url');
require('dotenv').config();

const PORT = 3010;
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
offsetNum = (page - 1) * count;
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
//   const productId = req.params.product_id;
//   pool.query(`select * from style where product_id = ${productId} `,(err, results) => {
//     if (err) {
//       throw err//     }
//     res.status(200).json(results.rows)
// })
const stylesQuery = `SELECT
product_id,
json_build_object('results',
          json_agg(json_build_object(
            'style_id', id,
            'name', style_name,
            'original_price', original_price,
            'sale_price', sales_price,
            'default?', default_style,
            'photos', (
              SELECT json_agg(
                json_build_object(
                  'thumbnail_url', thumbnail_url,
                  'url', photo_url
                )
              )
              FROM photo
              WHERE photo.style_id = style.id
              GROUP BY style.id
            ),
            'skus', (
              SELECT json_object_agg(sku.id, json_build_object(
                'quantity', quantity,
                'size', size
              )
              )
              FROM sku
              WHERE sku.style_id = style.id
              GROUP BY style.id
            )
           )
           )
         )
FROM
style
WHERE
product_id = $1
GROUP BY
product_id
ORDER BY
product_id
`

pool.query(stylesQuery, [req.params.product_id], (err,results) => {
  if (err) {
    res.status(500)
  }
  // console.log(results)
  if (results.rows.length === 0) {
    res.json({
      product_id: req.params.id,
      results: []
    })
  } else {

  return res.json({
    product_id: results.rows[0].product_id,
    results: results.rows[0].json_build_object.results
  })
}
})
})

 app.get('/products/:product_id/related', (req, res) => {
   const productId = req.params.product_id;
   console.log(pool)
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
