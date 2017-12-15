//部门表
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Department',{
	    id: {
		    type: DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true,
		    allowNull: false,
		    field: 'id',
		    comment: '部门id'
	    },
	    departmentName: {
		    type: DataTypes.STRING(50),
		    field: 'department_name',
		    comment: '部门名称'
	    }
    }, {
	    tableName: 'department',
	    timestamps: false,
	    charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}


