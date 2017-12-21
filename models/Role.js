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
	name: {
		type: DataTypes.STRING(50),
		field: 'name',
		comment: '角色名称'
	},
	describe: {
		type: DataTypes.STRING(255),
		field: 'describe',
		comment: '角色描述'
	}
}, {
	tableName: 'role',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})
}