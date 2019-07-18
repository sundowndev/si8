/* eslint-disable new-cap */
export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_hour: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_hour: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    athletes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'AWAITING', // AWAITING, STARTED, ENDED, CANCELLED, DELAYED
    },
  });

  return Events;
};
