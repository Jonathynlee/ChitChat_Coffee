module.exports = function (sequelize, DataTypes) {
    var products = sequelize.define("product", {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },    
        EstimatedTime:{
            type:DataTypes.INTEGER
        

        },
        
        basePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
            
        },
        addOns: {
            type: DataTypes.TEXT,
            allowNull: false
            
        }, 
        image:{
            type: DataTypes.STRING,
            allowNull: true

        }, 
        description:{
            type: DataTypes.TEXT,
            allowNull: true
        }, 
        seasonal:{
            type:DataTypes.STRING
        },    
        sizes:{
            type:DataTypes.STRING
        },    
        temp:{
            type:DataTypes.STRING
        }

        
    });
    products.associate = function(models) {
        // We're saying that a products should belong to an Author
        // A products can't be created without an Author due to the foreign key constraint
        products.belongsTo(models.category, {
          foreignKey: {
            allowNull: true
          }
        })
        products.hasMany(models.orderitem, {

          })
        };
    
    return products;
};
