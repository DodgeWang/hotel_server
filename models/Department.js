// const Sequelize = require('sequelize');
// let sequelize = require('../utils/db');

// //部门表
// module.exports=sequelize.define('department',{
// 	departmentId: {
// 		type: Sequelize.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 		allowNull: false,
// 		field: 'department_id',
// 		comment: '部门id'
// 	},
// 	departmentName: {
// 		type: Sequelize.STRING(50),
// 		field: 'department_name',
// 		comment: '部门名称'
// 	}
// }, {
// 	freezeTableName: true,
// 	timestamps: true
// })



//部门表
module.exports = (sequelize, DataTypes) => {
	return 
	sequelize.define('department',{
	    departmentId: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'department_id',
		    comment: '部门id'
	    },
	    departmentName: {
		    type: DataTypes.STRING(50),
		    field: 'department_name',
		    comment: '部门名称'
	    }
    }, {
	    freezeTableName: true,
	    timestamps: true
    })
}


