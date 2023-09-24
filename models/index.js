// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  through: {
    foreignKey: 'category_id',
  },
});

Category.hasMany(Product, {
  through: {
    foreignKey: 'category_id',
  },
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
