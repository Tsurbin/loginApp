module.exports = (sequelize, DataTypes) => {
	const user_refresh_token = sequelize.define('user_refresh_token', {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        refreshToken: {
            type: DataTypes.STRING,
        },
        createDate: {
            type: DataTypes.DATE,
        },
        expireDate: {
            type: DataTypes.DATE,
        }
	},
	{
        tableName: 'user_refresh_token'
	});
	 return user_refresh_token;
};