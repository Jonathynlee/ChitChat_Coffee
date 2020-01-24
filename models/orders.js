module.exports = function (sequelize, DataTypes) {
    var orders = sequelize.define("order", {
 
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
    orders.associate = function(models) {
        // We're saying that a orders should belong to an Author
        // A orders can't be created without an Author due to the foreign key constraint
        orders.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        })
        orders.hasMany(models.orderitem, {
            
          })
        };
    
    return orders;
};
