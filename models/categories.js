module.exports = function (sequelize, DataTypes) {
    var categories = sequelize.define("categories", {
        name: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        descritpion: {
            type: DataTypes.TEXT


        }
    });
    
  categories.associate = function(models) {
    // Associating Categories with Posts
    // When an Categories is deleted, also delete any associated Posts
    categories.hasMany(models.products, {
      
    });
  };



    return categories;
};


