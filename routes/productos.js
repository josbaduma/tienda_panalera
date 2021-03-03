import express from 'express'
const router = express.Router();
import db from '../database'
// Filtrar campos de PUT
import underscore from 'underscore';

router.post('/producto/create', async (req, res) => {
  const body = {
    barcode: req.body.barcode,
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  try {
    const producto = await db.Producto.create(body);
    return res.status(200).json({
      message: 'Producto añadida',
      producto
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
})

router.get('/producto/list', async (req, res) => {
  try {
    const response = await db.Producto.findAll({
      include: [db.Categoria]
    });
    const productos = response.map(el => el.get({ plain: true }));

    return res.json(productos);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

router.get('/producto/list/:id', async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const response = await db.Producto.findAll({
      where: { id: _id }
    });
    const productos = response.map(el => el.get({ plain: true }));

    return res.json(productos);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

// PUT
router.put('/producto/:id', async (req, res) => {
  const _id = Number(req.params.id);
  const body = {
    barcode: req.body.barcode,
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  try {
    const producto = await db.Producto.update(body, { where: { id: _id } });

    return res.json(producto);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

// DELETE
router.delete('/producto/:id', async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const producto = await db.Producto.destroy({ where: { id: _id } });

    return res.json(producto);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

module.exports = router;