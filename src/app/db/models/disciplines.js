/* eslint-disable new-cap */
export default (sequelize, DataTypes) => {
  const Disciplines = sequelize.define('Disciplines', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Disciplines.associate = (models) => {
    models.Events.belongsTo(models.Disciplines, {
      as: 'discipline',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Disciplines;
};
