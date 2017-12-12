'use strict';
let sequelize = require('../utils/db').sequelize();

let Employee = sequelize.import('./Employee');
let EmployeeInfo = sequelize.import('./EmployeeInfo');
let EduExperience = sequelize.import('./EduExperience');
let WorkExperience = sequelize.import('./WorkExperience');
let SocialRelations = sequelize.import('./SocialRelations');
let Department = sequelize.import('./Department');
// let Events = sequelize.import('./Events');
// let EventShare = sequelize.import('./EventShare');
// let EventType = sequelize.import('./EventType');
// let Position = sequelize.import('./Position');
// let Power = sequelize.import('./Power');
// let PowerClassify = sequelize.import('./PowerClassify');
// let ReportConfig = sequelize.import('./ReportConfig');
// let Role = sequelize.import('./Role');
// let RolePowerRelation = sequelize.import('./RolePowerRelation');
// let RoomArticle = sequelize.import('./RoomArticle');
// let RoomArticleRelation = sequelize.import('./RoomArticleRelation');
// let RoomCheckIn = sequelize.import('./RoomCheckIn');
// let RoomInfo = sequelize.import('./RoomInfo');
// let RoomType = sequelize.import('./RoomType');

// let Task = sequelize.import('./Task');
// let TaskImg = sequelize.import('./TaskImg');
// let TaskType = sequelize.import('./TaskType');

// let WorkSchedule = sequelize.import('./WorkSchedule');




//关联关系

Employee.hasOne(EmployeeInfo,{foreignKey: 'employee_id'});
EmployeeInfo.belongsTo(Employee,{foreignKey: 'employee_id'});

Employee.hasMany(EduExperience, {foreignKey:'employee_id'});
Employee.hasMany(WorkExperience, {foreignKey:'employee_id'});
Employee.hasMany(SocialRelations, {foreignKey:'employee_id'});


// 同步模型到数据库中
sequelize.sync();





exports.Employee = Employee;
exports.EmployeeInfo = EmployeeInfo;
exports.EduExperience = EduExperience;
exports.WorkExperience = WorkExperience;
exports.SocialRelations = SocialRelations;
exports.Department = Department;
// exports.Events = Events;
// exports.EventShare = EventShare;
// exports.EventType = EventType;
// exports.Position = Position;
// exports.Power = Power;
// exports.PowerClassify = PowerClassify;
// exports.ReportConfig = ReportConfig;
// exports.Role = Role;
// exports.RolePowerRelation = RolePowerRelation;
// exports.RoomArticle = RoomArticle;
// exports.RoomArticleRelation = RoomArticleRelation;
// exports.RoomCheckIn = RoomCheckIn;
// exports.RoomInfo = RoomInfo;
// exports.RoomType = RoomType;

// exports.Task = Task;
// exports.TaskImg = TaskImg;
// exports.TaskType = TaskType;
// exports.WorkSchedule = WorkSchedule;
