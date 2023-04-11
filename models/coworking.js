module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est deja pris.'
            },
            validate: {
                notEmpty: {
                    msg: 'Ce champ ne peut etre vide.'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
        },
        superficy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false``,
            validate: {
                isInt: {
                    msg:'Le nombre de postes doit etre un entier'
                }
            }
        },
        price: {
            type: DataTypes.JSON,
            allowNull: false,
            
        },
        address: {
            type: DataTypes.JSON,
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}