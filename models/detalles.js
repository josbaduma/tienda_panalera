'use strict'

module.exports = (sequelize, DataTypes) => {

  const Detalle = sequelize.define('Detalle', {
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'detalles',
    timestamps: false
  });
  return Detalle;
}