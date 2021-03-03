'use strict'

module.exports = (sequelize, DataTypes) => {

  const Venta = sequelize.define('Venta', {
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    subtotal: {
      type: DataTypes.REAL,
      allowNull: false
    },
    taxes: {
      type: DataTypes.REAL,
      allowNull: false
    },
    total: {
      type: DataTypes.REAL,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'ventas',
    timestamps: false
  });
  return Venta;
}