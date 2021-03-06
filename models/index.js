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
let RoomCheckIn = sequelize.import('./RoomCheckIn');
let WorkSchedule = sequelize.import('./WorkSchedule');
let TaskType = sequelize.import('./TaskType');
let Task = sequelize.import('./Task');
let TaskFlow = sequelize.import('./TaskFlow');
let EventType = sequelize.import('./EventType');
let Event = sequelize.import('./Event');
let EventShare = sequelize.import('./EventShare');





//关联关系

//员工与基本信息关联关系（一对一）
Employee.hasOne(EmployeeInfo,{foreignKey: 'employee_id'});
EmployeeInfo.belongsTo(Employee,{foreignKey: 'employee_id'});

//角色与权限关联关系（一对多）
Role.hasMany(RolePower, {foreignKey:'role_id'});
RolePower.belongsTo(Role, {foreignKey:'role_id'});

//员工与部门关联关系（多对一）
Department.hasMany(Employee, {foreignKey:'department_id',as: { singular: 'employee', plural: 'employeeList' }});
Employee.belongsTo(Department, {foreignKey:'department_id'});

//员工与角色关联关系（多对一）
Role.hasMany(Employee, {foreignKey:'role_id'});
Employee.belongsTo(Role, {foreignKey:'role_id'});

//员工与教育经验关联关系（一对多）
Employee.hasMany(EduExperience, {foreignKey:'employee_id'});

//员工与工作经验关联关系（一对多）
// Employee.hasMany(WorkExperience, {foreignKey:'employee_id',as:'workExperience'});
Employee.hasMany(WorkExperience, {foreignKey:'employee_id'});
WorkExperience.belongsTo(Employee, {foreignKey:'employee_id'})


//员工与社会关系关联关系（一对多）
Employee.hasMany(SocialRelations, {foreignKey:'employee_id'});




//员工与排班关联关系（一对多）
Employee.hasMany(WorkSchedule, {foreignKey:'employee_id'});
WorkSchedule.belongsTo(Employee, {foreignKey:'employee_id'});




//房间类型和房间关联关系（一对多）
RoomType.hasMany(RoomInfo, {foreignKey:'type_id'});
RoomInfo.belongsTo(RoomType, {foreignKey:'type_id'});

//房间和物品关联关系（多对多）
RoomInfo.belongsToMany(RoomArticle, { through: RoomArticleRel,foreignKey:'room_id',as: { singular: 'article', plural: 'articles' }})
RoomArticle.belongsToMany(RoomInfo, { through: RoomArticleRel,foreignKey:'article_id'});

//房间和入住信息关联关系（一对多）
RoomInfo.hasMany(RoomCheckIn, {foreignKey:'room_id'});
RoomCheckIn.belongsTo(RoomInfo, {foreignKey:'room_id'});

//任务链与角色关联
TaskType.belongsTo(Role,{foreignKey:'allocator_role',as:'allocator'});
TaskType.belongsTo(Role,{foreignKey:'executor_role',as:'executor'});
TaskType.belongsTo(Role,{foreignKey:'examiner_role',as:'examiner'});

//任务流程与员工关联
TaskFlow.belongsTo(Employee, {foreignKey:'employee_id'});

//任务与房间的关联关系
Task.belongsTo(RoomInfo,{foreignKey:'room_id'});

//任务与任务链的关联关系
Task.belongsTo(TaskType,{foreignKey:'tasktype_id'});

//任务与任务流程的关联关系
Task.hasMany(TaskFlow, {foreignKey:'task_id'});
TaskFlow.belongsTo(Task, {foreignKey:'task_id'});	

//事件与事件类型的关联关系
EventType.hasMany(Event, {foreignKey:'type_id'});
Event.belongsTo(EventType, {foreignKey:'type_id'});

//事件与事件分享的关联关系
Event.hasMany(EventShare, {foreignKey:'event_id'});
EventShare.belongsTo(Event, {foreignKey:'event_id'});





// 同步模型到数据库中
sequelize.sync();
// sequelize.sync({force:true});
// RoomArticle.sync({force:true});


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
exports.RoomArticleRel = RoomArticleRel;
exports.RoomCheckIn = RoomCheckIn;
exports.WorkSchedule = WorkSchedule;
exports.TaskType = TaskType;
exports.Task = Task;
exports.TaskFlow = TaskFlow;
exports.EventType = EventType;
exports.Event = Event;
exports.EventShare = EventShare;

