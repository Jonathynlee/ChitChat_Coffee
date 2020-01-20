module.exports = function (sequelize, DataTypes) {
    var categories = sequelize.define("category", {
        name: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true


        }
    });
    
  categories.associate = function(models) {
    // Associating Categories with Posts
    // When an Categories is deleted, also delete any associated Posts
    categories.hasMany(models.product,{
    
    });
  };



    return categories;
};


