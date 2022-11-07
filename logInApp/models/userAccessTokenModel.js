module.exports = (sequelize, DataTypes) => {
	const user_access_token = sequelize.define('user_access_token', {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        accessToken: {
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
        tableName: 'user_access_token'
	});
	 return user_access_token;
};