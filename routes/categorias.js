import express from 'express'
const router = express.Router();
import db from '../database'
// Filtrar campos de PUT
const _ = require('underscore');

router.post('/categoria/create', async (req, res) => {
  const body = {
    name: req.body.name,
  };

  try {
    const categoria = await db.Categoria.create(body);
    return res.status(200).json({
      message: 'Categoria añadida',
      categoria
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
})

router.get('/categoria/list', async (req, res) => {
  try {
    const response = await db.Categoria.findAll();
    const categorias = response.map(el => el.get({ plain: true }));

    return res.json(categorias);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

router.get('/categoria/list/:id', async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const response = await db.Categoria.findAll({
      where: { id: _id }
    });
    const categorias = response.map(el => el.get({ plain: true }));

    return res.json(categorias);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

// PUT
router.put('/categoria/:id', async (req, res) => {
  const _id = Number(req.params.id);
  const body = {
    name: req.body.name,
  };

  try {
    const categoria = await db.Categoria.update(body, { where: { id: _id } });

    return res.json(categoria);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

// DELETE
router.delete('/categoria/:id', async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const categoria = await db.Categoria.destroy({ where: { id: _id } });

    return res.json(categoria);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

module.exports = router;