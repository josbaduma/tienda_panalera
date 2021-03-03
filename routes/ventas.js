import express from "express";
const router = express.Router();
import db from "../database";
// Filtrar campos de PUT
const _ = require("underscore");

router.post("/venta/create", async (req, res) => {
  const body = {
    client_id: req.body.cliente,
    subtotal: req.body.subtotal,
    taxes: req.body.impuestos,
    total: req.body.total,
    type: req.body.tipo,
  };
  const detalles = req.body.detalles;

  try {
    const venta = await db.Venta.create(body);

    await _.each(detalles, async (detalle) => {
      try {
        const item = {
          producto_id: detalle.producto,
          cantidad: detalle.cantidad,
          venta_id: venta.id,
          monto: detalle.monto,
        };
        await db.Detalle.create(item);

        const response = await db.Producto.findAll({
          where: { id: item.producto_id },
        });
        const producto = response.map((el) => el.get({ plain: true }));
        const _id = Number(item.producto_id);

        const prod = {
          quantity: producto[0].quantity - item.cantidad,
        };

        await db.Producto.update(prod, { where: { id: _id } });
      } catch (error) {
        return error;
      }
    });
    return res.status(200).json({
      message: "Venta añadida",
      venta,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
});

router.get("/venta/list", async (req, res) => {
  try {
    const response = await db.Venta.findAll({
      include: { model: db.Detalle, include: [db.Producto] },
    });
    const ventas = response.map((el) => el.get({ plain: true }));

    ventas.forEach((element) => {
      element.show = false;
    });

    return res.json(ventas);
  } catch (error) {
    return res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
});

router.get("/venta/list/:id", async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const response = await db.Venta.findAll({
      where: { id: _id },
      include: { model: db.Detalle, include: [db.Producto] },
    });
    const ventas = response.map((el) => el.get({ plain: true }));

    ventas.forEach((element) => {
      element.show = false;
    });

    return res.json(ventas);
  } catch (error) {
    return res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
});

// PUT
router.put("/venta/:id", async (req, res) => {
  const _id = Number(req.params.id);
  const body = {
    client_id: req.body.cliente,
    subtotal: req.body.subtotal,
    taxes: req.body.impuestos,
    total: req.body.total,
    type: req.body.tipo,
  };

  try {
    const venta = await db.Venta.update(body, { where: { id: _id } });

    return res.json(venta);
  } catch (error) {
    return res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
});

// DELETE
router.delete("/venta/:id", async (req, res) => {
  const _id = Number(req.params.id);
  try {
    const venta = await db.Venta.destroy({ where: { id: _id } });

    return res.json(venta);
  } catch (error) {
    return res.status(400).json({
      message: "Ocurrio un error",
      error,
    });
  }
});

module.exports = router;
