'use strict'

module.exports = (sequelize, DataTypes) => {

  const Cliente = sequelize.define('Cliente', {
    cedula: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'clientes',
    timestamps: false
  });
  return Cliente;
}