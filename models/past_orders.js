module.exports = function (sequelize, DataTypes) {
    var past_orders = sequelize.define("Products", {
 
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false
            
        },
       
        status: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        pickUpDate: {
            type: DataTypes.DATE,
            allowNull: false
            
        }, 
        total:{
            type: DataTypes.FLOAT, 
            allowNull:false
        }

        
    });
    past_orders.associate = function(models) {
        // We're saying that a past_orders should belong to an Author
        // A past_orders can't be created without an Author due to the foreign key constraint
        past_orders.belongsTo(models.users, {
          foreignKey: {
            allowNull: false
          }
        })
        past_orders.hasMany(models.orderitem, {
            
          })
        };
    
    return orders;
};
