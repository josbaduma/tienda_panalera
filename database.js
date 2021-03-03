'use strict'
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './tienda.sqlite3'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Producto = require('./models/productos')(sequelize, Sequelize);
db.Categoria = require('./models/categorias')(sequelize, Sequelize);
db.Cliente = require('./models/clientes')(sequelize, Sequelize);
db.Venta = require('./models/ventas')(sequelize, Sequelize);
db.Detalle = require('./models/detalles')(sequelize, Sequelize);

//Relations
db.Categoria.hasOne(db.Producto, { foreignKey: 'category' });
db.Producto.belongsTo(db.Categoria, { foreignKey: 'category' });

db.Producto.hasOne(db.Detalle, { foreignKey: 'producto_id' });
db.Detalle.belongsTo(db.Producto, { foreignKey: 'producto_id' });

db.Venta.hasMany(db.Detalle, { foreignKey: 'venta_id' });
db.Detalle.belongsTo(db.Venta, { foreignKey: 'venta_id' });

module.exports = db;