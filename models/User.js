'use strict';
var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        is:/^(\d{3}\-)?(\(\d{3}\))?\d{3}\-\d{4}$/
      }
    },
    addressLineOne:{
        type:DataTypes.STRING,
        allowNull:true
    },

    addressLineTwo:{
        type:DataTypes.STRING,
        allowNull:true,
    },

    city:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        is:/^[a-zA-Z\u0080-\u024F]+(?:. |-| |')*([1-9a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
      }
    },
    //for US
    state:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        is:/^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/
      }
    },
    zip:{      
      type:DataTypes.INTEGER,
      allowNull:true,
      validate:{
        is:/^([0-9]{5}(?:-[0-9]{4})?)*$/
      }
    },
    country:{
      type:DataTypes.STRING,
      allowNull:true,
    }

    
  }, {
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    hooks: {
      beforeCreate: function(user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.past_order, {
      onDelete:"cascade"
    });
    User.hasMany(models.order, {
      onDelete: "cascade"
    });
    
  }
  return User;
};