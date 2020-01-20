module.exports = function (sequelize, DataTypes) {
    var products = sequelize.define("Products", {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        quantity: {
            type: DataTypes.INTEGER
            


        },
        basePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
            
        },
        addOns: {
            type: DataTypes.TEXT,
            allowNull: false
            
        }, 
        images:{
            type: DataTypes.STRING
        }, 
        descritpion:{
            type: DataTypes.TEXT
        }, 
        seasonal:{
            type:DataTypes.BOOLEAN
        }

        
    });
    products.associate = function(models) {
        // We're saying that a products should belong to an Author
        // A products can't be created without an Author due to the foreign key constraint
        products.belongsTo(models.categories, {
          foreignKey: {
            allowNull: false
          }
        })
        products.hasMany(models.orderitem, {

          })
        };
    
    return products;
};
