const express = require('express');
const app = express();
app.use(express.json());
app.use(require('morgan')('dev'));

const { client,
    createTables, 
    createProduct, 
    createUser,
    fetchUsers,
    fetchProducts,
    createFavorite,
    fetchFavorites,
    destroyFavorite
  } = require('./db');

  

app.get('/api/users', async (req, res, next) => {
   try{
      res.send(await fetchUsers());

   } catch(ex) {
      next(ex);
   }
});

app.get('/api/products', async (req, res, next) => {
    try {
        res.send(await fetchProducts());
    } catch (ex) {
        next(ex);
    }
 });

 app.get('/api/users/:id/favorites', async (req, res, next) => {
    try {
        res.send(await fetchFavorites({ user_id: req.params.id }));        
    } catch (ex) {
        next(ex)
    }
 });
 app.post('/api/users/:id/favorites', async (req, res, next) => {
    try {
        res.send(await createFavorite({ product_id: req.body.product_id, user_id: req.params.id }));
    } catch (ex) {
        next(ex);
    }
 });
 app.post('/api/users/:id/favorites', async (req, res, next) => {
    try {
        res.send(await createFavorite({ product_id: req.body.product_id, user_id: req.params.id }));
    } catch (ex) {
        next(ex);
    }
 });
const init = async () => {
    await client.connect();
    console.log('connected to db');
    await createTables();
    console.log('tables created');
    const [ 
        Esti,
        Rachel,
        Harold,
        Lisa,
        Flour,
        Eggs,
        Sugar,
        Chocolate,
        Sprinkels,
    ] = await Promise.all([
        await createUser({ username: 'Esti', password: 'Aug@05'}),
        await createUser({ username: 'Rachel', password: 'Jan@05'}),
        await createUser({ username: 'Harold', password: 'Nov@76'}),
        await createUser({ username: 'Lisa', password: 'Nov@73'}),
      await createProduct({ name: 'Flour'}),
      await createProduct({ name: 'Eggs'}),
      await createProduct({ name: 'Sugar'}),
      await createProduct({ name: 'Chocolate'}),
      await createProduct({ name: ' Sprinkels'}),
    ]);
    const users = await fetchUsers();
    console.log(users);
    const products = await fetchProducts();
    console.log(products);
    const [ estiFav, rachelFav, haroldFav, lisaFav ] = await Promise.all([
      await createFavorite({ user_id: estiFav.id, product_id: Chocolate.id}),
      await createFavorite({ user_id: rachelFav.id, product_id: Eggs.id}),
      await createFavorite({ user_id: haroldFav.id, product_id: Sugar.id}),
      await createFavorite({ user_id: lisaFav.id, product_id: Sprinkels.id})
    ]);
    console.log('fetchFavorites: ', await fetchFavorites({ user_id: Esti.id}));
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));

 };

init();