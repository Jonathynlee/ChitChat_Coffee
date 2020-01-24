module.exports = function (sequelize, DataTypes) {
    var orderitem = sequelize.define("orderitem", {
 
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue:1
            
        },
       
        basePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
            
        },
        addons: {
            type: DataTypes.TEXT,
            allowNull: false
            
        }, 
        subtotal:{
            type: DataTypes.FLOAT, 
            allowNull:false
        }

        
    });
    orderitem.associate = function(models) {
        // We're saying that a orderitem should belong to an Author
        // A orderitem can't be created without an Author due to the foreign key constraint
        orderitem.belongsTo(models.order, {
          foreignKey: {
            allowNull: false
          }
        })
        orderitem.belongsTo(models.product, {
            foreignKey: {
              allowNull: false
            }
          })
          
        };
    
    return orderitem;
};
