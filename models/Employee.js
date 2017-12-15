//员工表
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Employee', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		unique: true,
		field: 'id',
		comment: '员工id',
	},
	username: {
		type: DataTypes.STRING(100),
		field: 'username',
		comment: '用户名，用户名==电话号码'
	},
	password: {
		type: DataTypes.STRING(200),
		field: 'password',
		comment: '密码，加密'
	},
	departmentId: {
		type: DataTypes.INTEGER,
		field: 'department_id',
		comment: '部门id'
	},
	positionId: {
		type: DataTypes.INTEGER,
		field: 'position_id',
		comment: '职位id'
	},
	roleId: {
		type: DataTypes.INTEGER,
		field: 'role_id',
		comment: '角色id'
	},
	employeeStatus: {
		type: DataTypes.INTEGER,
		field: 'employee_status',
		comment: '用户状态，1正常，2禁用，3删除'
	}
}, {
	tableName: 'employee',
	timestamps: true,
	charset: 'utf8',
    collate: 'utf8_general_ci',
})

}


