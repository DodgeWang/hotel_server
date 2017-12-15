//房间物品表
module.exports = (sequelize, DataTypes) => {
 return sequelize.define('Role',{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: '角色id'
	},
	roleName: {
		type: DataTypes.STRING(50),
		field: 'role_name',
		comment: '角色名称'
	},
	roleDes: {
		type: DataTypes.STRING(255),
		field: 'role_des',
		comment: '角色描述'
	}
}, {
	tableName: 'role',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}