const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//员工表
module.exports = sequelize.define('employee', {
	employeeId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'employee_id',
		comment: '员工id',
	},
	employeeIdcode: {
		type: Sequelize.STRING(100),
		field: 'employee_idcode',
		comment: '员工唯一标识符'
	},
	userName: {
		type: Sequelize.STRING(100),
		field: 'username',
		comment: '用户名，用户名==电话号码'
	},
	password: {
		type: Sequelize.STRING(200),
		field: 'password',
		comment: '密码，加密'
	},
	departmentId: {
		type: Sequelize.INTEGER,
		field: 'department_id',
		comment: '部门id'
	},
	positionId: {
		type: Sequelize.INTEGER,
		field: 'position_id',
		comment: '职位id'
	},
	roleId: {
		type: Sequelize.INTEGER,
		field: 'role_id',
		comment: '角色id'
	},
	employeeStatus: {
		type: Sequelize.INTEGER,
		field: 'employee_status',
		comment: '用户状态，1正常，2禁用，3删除'
	}
}, {
	freezeTableName: true,
	timestamps: true
})