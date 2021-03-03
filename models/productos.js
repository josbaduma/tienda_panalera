'use strict'

module.exports = (sequelize, DataTypes) => {

  const Producto = sequelize.define('Producto', {
    barcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false  
    }
  }, {
    tableName: 'productos',
    timestamps: false
  });
  return Producto;
}