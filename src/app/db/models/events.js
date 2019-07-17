/* eslint-disable new-cap */
export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    players: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'AWAITING', // AWAITING, IN_PROGRESS, ENDED, CANCELLED, DELAYED
    },
  });

  return Events;
};
