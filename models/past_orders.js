module.exports = function (sequelize, DataTypes) {
    var past_orders = sequelize.define("past_order", {
 
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false
            
        },
       
        paymentType: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        addons: {
            type: DataTypes.TEXT,
            allowNull: false
            
        }, 
        amount:{
            type: DataTypes.FLOAT, 
            allowNull:false
        }

        
    });
  
    past_orders.associate = function(models) {
        // We're saying that a past_orders should belong to an Author
        // A past_orders can't be created without an Author due to the foreign key constraint
        past_orders.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          
 

        }
       
        });

    }
    return past_orders;
    
};
