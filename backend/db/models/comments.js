'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addAComment({ userId, comment, photoId }) {
      const newComment = await Comment.create({
        comment,
        userId,
        photoId,
      });
      return newComment;
    }
    static associate(models) {
      Comment.belongsTo(models.Photo, { foreignKey: "photoId" });
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      // define association here
    }
  };
  Comment.init(
    {
      comment: { type: DataTypes.STRING, allowNull: false },
      photoId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};