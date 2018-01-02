//工作排班表
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('WorkSchedule',{
	   id: {
		   type: DataTypes.INTEGER,
		   primaryKey: true,
		   autoIncrement: true,
		   allowNull: false,
		   field: 'id',
		   comment: '排班id'
	   },
	   employeeId: {
		   type: DataTypes.INTEGER,
		   field: 'employee_id',
		   comment: '员工id'
	   },
	   startTime: {
		   type: DataTypes.INTEGER,
		   field: 'start_time',
		   comment: '上班时间'
	   },
	   endTime: {
		   type: DataTypes.INTEGER,
		   field: 'end_time',
		   comment: '下班时间'
	   }
   }, {
	   tableName: 'work_schedule',
	   timestamps: false,
	   // paranoid: true,
	   charset: 'utf8',
       collate: 'utf8_general_ci'
   })
}