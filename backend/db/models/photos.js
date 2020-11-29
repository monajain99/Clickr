'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async removePhoto({ id }) {
      await Photo.destroy({
        where: {
          id,
        },
      });
      const message = "Photo Deleted";
      return message;
    }

    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: "userId" });
      Photo.hasMany(models.Comment, {
        foreignKey: "photoId",
        onDelete: "cascade",
        hooks: true,
      });
      // define association here
    }
  };
  Photo.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      photoUrl: { type: DataTypes.STRING },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};