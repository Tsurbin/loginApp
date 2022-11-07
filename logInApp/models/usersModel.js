module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define('users', {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        organization: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        userName: {
            type: DataTypes.STRING,
        }	
	},
	{
        tableName: 'users'
	});
	 return users;
};