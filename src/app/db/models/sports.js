/* eslint-disable new-cap */
export default (sequelize, DataTypes) => {
  const Sports = sequelize.define('Sports', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Sports.associate = (models) => {
    models.Disciplines.belongsTo(models.Sports, {
      as: 'sport',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Sports;
};
