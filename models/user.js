'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product,{ through: models.Cart})
      User.hasMany(models.Banner)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'invalid email format'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        notNull: {
          args: true,
          msg: 'email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password is required'
        },
        notEmpty: {
          args: true,
          msg: 'password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    let salt = bcrypt.genSaltSync(10)
    instance.password = bcrypt.hashSync(instance.password, salt)
  })
  return User;
};