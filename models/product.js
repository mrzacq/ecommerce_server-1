'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name is required'
        }
      }
    },
    image_url: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'image url is required'
        },
        isUrl: {
          msg: 'input must be url'
        }
      }
    },
    price: {
      type:  DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'price is required'
        },
        customValidator(value){
          let price = value
          if(price <= 0) throw { msg: 'price must be greater than zero'}
        }
      }
    },
    stock: {
      type:  DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'stock is required'
        },
        customValidator(value){
          let stock = value
          if(stock <= 0) throw { msg: 'stock must be greater than zero'}
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};