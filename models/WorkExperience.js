//员工工作经历表
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('WorkExperience',{
	id:{
		type:DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull:false,
		field:'id',
		comment:'工作经历id'
	},
	name:{
		type:DataTypes.STRING(100),
		field:'name',
		comment:'公司名称'
	},
	supervisor:{
		type:DataTypes.STRING(50),
		field:'supervisor',
		comment:'主管名称'
	},
	address:{
		type:DataTypes.STRING(200),
		field:'address',
		comment:'公司地址'
	},
	zipCode:{
		type:DataTypes.STRING(50),
		field:'zip_code',
		comment:'公司邮政编码'
	},
	phone:{
		type:DataTypes.STRING(50),
		field:'phone',
		comment:'公司电话号码'
	},
	workHours:{
		type:DataTypes.STRING(50),
		field:'work_hours',
		comment:'上班时长（小时/周）'
	},
	position:{
		type:DataTypes.STRING(50),
		field:'position',
		comment:'职位'
	},
	startTime:{
		type:DataTypes.STRING(50),
		field:'start_time',
		comment:'上班开始日期，格式yyyy-dd-mm'
	},
	endTime:{
		type:DataTypes.STRING(50),
		field:'end_time',
		comment:'离职日期，格式yyyy-dd-mm'
	},
	startSalary:{
		type:DataTypes.STRING(20),
		field:'start_salary',
		comment:'上班初薪资'
	},
	endSalary:{
		type:DataTypes.STRING(20),
		field:'end_salary',
		comment:'离职时薪资'
	},
	leaveReason:{
		type:DataTypes.STRING(500),
		field:'leave_reason',
		comment:'离职原因'
	},
	summary:{
		type:DataTypes.STRING(500),
		field:'summary',
		comment:'自我描述'
	},
	canContact:{
		type:DataTypes.INTEGER,
		field:'can_contact',
		comment:'是否可以打电话给上一家公司，1可以，0不可以'
	},
	employeeId: {
		type: DataTypes.INTEGER,
		field: 'employee_id',
		comment: '员工id'
	}
},{
	tableName: 'work_experience',
	timestamps: false,
	charset: 'utf8',
    collate: 'utf8_general_ci'
})

}
