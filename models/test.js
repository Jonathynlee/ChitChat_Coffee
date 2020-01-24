'use strict';

module.exports = function(sequelize, DataTypes) {
  const Trip = sequelize.define('test', {
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true
      }
    // The password cannot be null
  });

  return Trip;
}