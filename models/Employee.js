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
		comment: '用户名'
	},
	password: {
		type: DataTypes.STRING(200),
		field: 'password',
		comment: '密码，加密'
	},
	name: {
		type: DataTypes.STRING(100),
		field: 'name',
		comment: '真实姓名'
	},
	photo: {
        type: DataTypes.STRING(200),
		field: 'photo',
		comment: '头像地址'
	},
	email: {
		type: DataTypes.STRING(50),
		field: 'email',
		comment: '邮箱'
	},
	phone: {
		type: DataTypes.STRING(30),
		field: 'phone',
		comment: '电话号码'
	},
	departmentId: {
		type: DataTypes.INTEGER,
		field: 'department_id',
		comment: '部门id'
	},
	roleId: {
		type: DataTypes.INTEGER,
		field: 'role_id',
		comment: '角色id'
	},
	isSuper: {
		type: DataTypes.INTEGER,
		field: 'is_super',
		comment: '是否是超级管理员，1是，0不是'
	},
	status: {
		type: DataTypes.INTEGER,
		field: 'status',
		comment: '用户状态，1正常，2禁用，3删除'
	},
	createTime: {
		type: DataTypes.INTEGER,
		field: 'create_time',
		comment: '创建时间'
	}
}, {
	tableName: 'employee',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci',
})

}


