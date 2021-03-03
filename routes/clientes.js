import express from 'express'
const router = express.Router();
import db from '../database'
// Filtrar campos de PUT
const _ = require('underscore');

router.post('/cliente/create', async (req, res) => {
  const body = {
    cedula: req.body.cedula,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  };

  try {
    const cliente = await db.Cliente.create(body);
    return res.status(200).json({
      message: 'Cliente añadida',
      cliente
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
})

router.get('/cliente/list', async (req, res) => {
  try {
    const response = await db.Cliente.findAll();
    const clientes = response.map(el => el.get({ plain: true }));

    return res.json(clientes);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

router.get('/cliente/list/:id', async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const response = await db.Cliente.findAll({
      where: { id: _id }
    });
    const clientes = response.map(el => el.get({ plain: true }));

    return res.json(clientes);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

// PUT
router.put('/cliente/:id', async (req, res) => {
  const _id = Number(req.params.id);
  const body = {
    cedula: req.body.cedula,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  };

  try {
    const cliente = await db.Cliente.update(body, { where: { id: _id } });

    return res.json(cliente);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

// DELETE
router.delete('/cliente/:id', async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const cliente = await db.Cliente.destroy({ where: { id: _id } });

    return res.json(cliente);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

module.exports = router;