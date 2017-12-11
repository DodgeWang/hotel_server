'use strict';
let sequelize = require('../utils/db').sequelize();

// let Department = sequelize.import('./Department');
// let EducationExperience = sequelize.import('./EducationExperience');
let Employee = sequelize.import('./Employee');
let EmployeeInfo = sequelize.import('./EmployeeInfo');
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
// let SocialRelations = sequelize.import('./SocialRelations');
// let Task = sequelize.import('./Task');
// let TaskImg = sequelize.import('./TaskImg');
// let TaskType = sequelize.import('./TaskType');
// let WorkExperience = sequelize.import('./WorkExperience');
// let WorkSchedule = sequelize.import('./WorkSchedule');




//关联关系
Employee.hasOne(EmployeeInfo,{foreignKey: 'employee_id'});
EmployeeInfo.belongsTo(Employee,{foreignKey: 'employee_id'});
// Employee.hasOne(EmployeeInfo);
// EmployeeInfo.belongsTo(Employee);



// 同步模型到数据库中
sequelize.sync();



// exports.Department = Department;
// exports.EducationExperience = EducationExperience;
exports.Employee = Employee;
exports.EmployeeInfo = EmployeeInfo;
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
// exports.SocialRelations = SocialRelations;
// exports.Task = Task;
// exports.TaskImg = TaskImg;
// exports.TaskType = TaskType;
// exports.WorkExperience = WorkExperience;
// exports.WorkSchedule = WorkSchedule;




// exports.Department = require('./Department');
// exports.EducationExperience = require('./EducationExperience');
// exports.Employee = require('./Employee');
// exports.EmployeeInfo = require('./EmployeeInfo');
// exports.Events = require('./Events');
// exports.EventShare = require('./EventShare');
// exports.EventType = require('./EventType');
// exports.Position = require('./Position');
// exports.Power = require('./Power');
// exports.PowerClassify = require('./PowerClassify');
// exports.ReportConfig = require('./ReportConfig');
// exports.Role = require('./Role');
// exports.RolePowerRelation = require('./RolePowerRelation');
// exports.RoomArticle = require('./RoomArticle');
// exports.RoomArticleRelation = require('./RoomArticleRelation');
// exports.RoomCheckIn = require('./RoomCheckIn');
// exports.RoomInfo = require('./RoomInfo');
// exports.RoomType = require('./RoomType');
// exports.SocialRelations = require('./SocialRelations');
// exports.Task = require('./Task');
// exports.TaskImg = require('./TaskImg');
// exports.TaskType = require('./TaskType');
// exports.WorkExperience = require('./WorkExperience');
// exports.WorkSchedule = require('./WorkSchedule');














