'use strict'

module.exports = (sequelize, DataTypes) => {

  const Categoria = sequelize.define('Categoria', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'categorias',
    timestamps: false
  });
  return Categoria;
}