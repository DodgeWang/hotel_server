'use strict';
let sequelize = require('../utils/db').sequelize();

let Employee = sequelize.import('./Employee');
let EmployeeInfo = sequelize.import('./EmployeeInfo');
let EduExperience = sequelize.import('./EduExperience');
let WorkExperience = sequelize.import('./WorkExperience');
let SocialRelations = sequelize.import('./SocialRelations');
let Department = sequelize.import('./Department');
let Role = sequelize.import('./Role');
let RolePower = sequelize.import('./RolePower');
let RoomInfo = sequelize.import('./RoomInfo');
let RoomType = sequelize.import('./RoomType');
let RoomArticle = sequelize.import('./RoomArticle');
let RoomArticleRel = sequelize.import('./RoomArticleRel');



// let Events = sequelize.import('./Events');
// let EventShare = sequelize.import('./EventShare');
// let EventType = sequelize.import('./EventType');
// let Position = sequelize.import('./Position');
// let Power = sequelize.import('./Power');
// let PowerClassify = sequelize.import('./PowerClassify');
// let ReportConfig = sequelize.import('./ReportConfig');
// let Role = sequelize.import('./Role');
// let RolePowerRelation = sequelize.import('./RolePowerRelation');

// let RoomArticleRelation = sequelize.import('./RoomArticleRelation');
// let RoomCheckIn = sequelize.import('./RoomCheckIn');


// let Task = sequelize.import('./Task');
// let TaskImg = sequelize.import('./TaskImg');
// let TaskType = sequelize.import('./TaskType');

// let WorkSchedule = sequelize.import('./WorkSchedule');




//关联关系

//员工与基本信息关联关系（一对一）
Employee.hasOne(EmployeeInfo,{foreignKey: 'employee_id'});
EmployeeInfo.belongsTo(Employee,{foreignKey: 'employee_id'});

//员工与角色关联关系（多对一）
Role.hasMany(Employee, {foreignKey:'role_id'});
Employee.belongsTo(Role, {foreignKey:'role_id'});

//员工与部门关联关系（多对一）
Department.hasMany(Employee, {foreignKey:'department_id'});


//员工与教育经验关联关系（一对多）
Employee.hasMany(EduExperience, {foreignKey:'employee_id',as:'eduExperience'});

//员工与工作经验关联关系（一对多）
Employee.hasMany(WorkExperience, {foreignKey:'employee_id',as:'workExperience'});

//员工与社会关系关联关系（一对多）
Employee.hasMany(SocialRelations, {foreignKey:'employee_id',as:'socialRelations'});




//角色与权限关联关系（一对多）
Role.hasMany(RolePower, {foreignKey:'role_id',as:'powers'});


//房间类型和房间关联关系（一对多）
RoomType.hasMany(RoomInfo, {foreignKey:'roomtype_id',as:'roomType'});
RoomInfo.belongsTo(RoomType, {foreignKey:'roomtype_id',as:'roomType'});

//房间和物品关联关系（多对多）
RoomInfo.belongsToMany(RoomArticle, { through: RoomArticleRel,foreignKey:'room_id'})
RoomArticle.belongsToMany(RoomInfo, { through: RoomArticleRel,foreignKey:'article_id'})


// 同步模型到数据库中
sequelize.sync();
// sequelize.sync({force:true});







exports.Employee = Employee;
exports.EmployeeInfo = EmployeeInfo;
exports.EduExperience = EduExperience;
exports.WorkExperience = WorkExperience;
exports.SocialRelations = SocialRelations;
exports.Department = Department;
exports.Role = Role;
exports.RolePower = RolePower;


exports.RoomInfo = RoomInfo;
exports.RoomType = RoomType;
exports.RoomArticle = RoomArticle;

// exports.Events = Events;
// exports.EventShare = EventShare;
// exports.EventType = EventType;
// exports.Position = Position;
// exports.Power = Power;
// exports.PowerClassify = PowerClassify;
// exports.ReportConfig = ReportConfig;
// exports.Role = Role;
// exports.RolePowerRelation = RolePowerRelation;

// exports.RoomArticleRelation = RoomArticleRelation;
// exports.RoomCheckIn = RoomCheckIn;


// exports.Task = Task;
// exports.TaskImg = TaskImg;
// exports.TaskType = TaskType;
// exports.WorkSchedule = WorkSchedule;
