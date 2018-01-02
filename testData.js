/*添加部门*/
INSERT INTO `hotel`.`department` (`name`) VALUES ('人事部');
INSERT INTO `hotel`.`department` (`name`) VALUES ('维修部');
INSERT INTO `hotel`.`department` (`name`) VALUES ('保洁部');
INSERT INTO `hotel`.`department` (`name`) VALUES ('餐饮部');
INSERT INTO `hotel`.`department` (`name`) VALUES ('检查部');
INSERT INTO `hotel`.`department` (`name`) VALUES ('前台部');


/*添加角色*/
INSERT INTO `hotel`.`role` (`name`, `describe`, `createdAt`, `updatedAt`) VALUES ('保洁人员', '打扫清洁', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`role` (`name`, `describe`, `createdAt`, `updatedAt`) VALUES ('保洁经理', '发布清洁任务', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`role` (`name`, `describe`, `createdAt`, `updatedAt`) VALUES ('维修人员', '维修物品', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`role` (`name`, `describe`, `createdAt`, `updatedAt`) VALUES ('维修经理', '发布维修任务', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`role` (`name`, `describe`, `createdAt`, `updatedAt`) VALUES ('前台人员', '酒店前台', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`role` (`name`, `describe`, `createdAt`, `updatedAt`) VALUES ('检查人员', '检查清洁和维修', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`role` (`name`, `describe`, `createdAt`, `updatedAt`) VALUES ('管理员', '管理员', '2017-12-27 02:40:58', '2017-12-27 02:40:58');


/*添加员工*/
INSERT INTO `hotel`.`employee` (`id`, `username`, `password`, `department_id`, `position_id`, `role_id`, `status`, `createdAt`, `updatedAt`) VALUES ('1', 'user1', '000000', '3', '1', '1', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`employee` (`id`, `username`, `password`, `department_id`, `position_id`, `role_id`, `status`, `createdAt`, `updatedAt`) VALUES ('2', 'user2', '111111', '3', '2', '2', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`employee` (`id`, `username`, `password`, `department_id`, `position_id`, `role_id`, `status`, `createdAt`, `updatedAt`) VALUES ('3', 'user3', '000000', '2', '1', '3', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`employee` (`id`, `username`, `password`, `department_id`, `position_id`, `role_id`, `status`, `createdAt`, `updatedAt`) VALUES ('4', 'user4', '111111', '2', '2', '4', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`employee` (`id`, `username`, `password`, `department_id`, `position_id`, `role_id`, `status`, `createdAt`, `updatedAt`) VALUES ('5', 'user5', '000000', '5', '1', '6', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`employee` (`id`, `username`, `password`, `department_id`, `position_id`, `role_id`, `status`, `createdAt`, `updatedAt`) VALUES ('6', 'user6', '000000', '6', '1', '5', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');


/*员工个人信息*/
INSERT INTO `hotel`.`employee_info` (`id`, `name`, `ssn`, `home_address`, `zip_code`, `age`, `email`, `phone`, `work_day`, `work_hours_week`, `can_night`, `work_nature`, `work_time`, `is_legal_status`, `have_criminal_record`, `have_dl`, `dl_number`, `dl_issued_status`, `is_joined_army`, `is_member_ng`, `employee_id`) VALUES ('1', '王代强', '510622199308152716', '四川省绵竹市汉旺镇天池宜苑', '618200', '24', '453831794@qq.com', '18281865016', '0', '40', '1', '1', '2017-12-30', '1', '0', '1', '453832', '绵竹驾校', '0', '0', '1');
INSERT INTO `hotel`.`employee_info` (`id`, `name`, `ssn`, `home_address`, `zip_code`, `age`, `email`, `phone`, `work_day`, `work_hours_week`, `can_night`, `work_nature`, `work_time`, `is_legal_status`, `have_criminal_record`, `have_dl`, `dl_number`, `dl_issued_status`, `is_joined_army`, `is_member_ng`, `employee_id`) VALUES ('2', '潘章萍', '510622199310132785', '四川省绵竹市东北镇谷王村', '618200', '23', '2716545@qq.com', '17318645016', '1,2,3,4,5', '30', '0', '1', '2018-1-1', '1', '0', '1', '654827', '德阳驾校', '0', '0', '2');
INSERT INTO `hotel`.`employee_info` (`id`, `name`, `ssn`, `home_address`, `zip_code`, `age`, `email`, `phone`, `work_day`, `work_hours_week`, `can_night`, `work_nature`, `work_time`, `is_legal_status`, `have_criminal_record`, `have_dl`, `dl_number`, `dl_issued_status`, `is_joined_army`, `is_member_ng`, `employee_id`) VALUES ('3', '王代东', '510622199306032716', '重庆市含谷镇', '678722', '25', '987987@qq.com', '17283451234', '0', '40', '1', '1', '2018-2-1', '1', '0', '1', '324444', '重庆驾校', '0', '0', '3');
INSERT INTO `hotel`.`employee_info` (`id`, `name`, `ssn`, `home_address`, `zip_code`, `age`, `email`, `phone`, `work_day`, `work_hours_week`, `can_night`, `work_nature`, `work_time`, `is_legal_status`, `have_criminal_record`, `have_dl`, `dl_number`, `dl_issued_status`, `is_joined_army`, `is_member_ng`, `military_specialty`, `employee_id`) VALUES ('4', '邬天赐', '510622199305281234', '四川省绵竹市城南派出所', '618200', '25', '657436578@qq.com', '18281865044', '0', '40', '1', '1', '2017-12-1', '1', '0', '1', '445532', '绵竹驾校', '1', '0', '步兵', '4');
INSERT INTO `hotel`.`employee_info` (`id`, `name`, `ssn`, `home_address`, `zip_code`, `age`, `email`, `phone`, `work_day`, `work_hours_week`, `can_night`, `work_nature`, `work_time`, `is_legal_status`, `have_criminal_record`, `have_dl`, `is_joined_army`, `is_member_ng`, `employee_id`) VALUES ('5', '邓秋', '510622198906265217', '四川省绵竹市汉旺镇', '618200', '30', '928744@qq.com', '13890334555', '0', '40', '1', '1', '2018-3-1', '1', '0', '0', '0', '0', '5');
INSERT INTO `hotel`.`employee_info` (`id`, `name`, `ssn`, `home_address`, `zip_code`, `age`, `email`, `phone`, `work_day`, `work_hours_week`, `can_night`, `work_nature`, `work_time`, `is_legal_status`, `have_criminal_record`, `have_dl`, `is_joined_army`, `is_member_ng`, `employee_id`) VALUES ('6', '杨欢', '51062219872312', '四川省绵竹市西南镇', '618200', '32', '776363@qq.com', '13728193223', '0', '40', '1', '1', '2018-2-1', '1', '0', '0', '0', '0', '6');


/*员工教育经历*/
INSERT INTO `hotel`.`edu_experience` (`id`, `name`, `address`, `major`, `degree`, `graduation_time`, `stage`, `employee_id`) VALUES ('1', '绵竹实验中学', '绵竹市滨河路', '无', '初中', '2009-07-01', '1', '1');
INSERT INTO `hotel`.`edu_experience` (`id`, `name`, `address`, `major`, `degree`, `graduation_time`, `stage`, `employee_id`) VALUES ('2', '绵竹中学', '绵竹市新城', '理科', '高中', '2012-07-01', '1', '1');
INSERT INTO `hotel`.`edu_experience` (`id`, `name`, `address`, `major`, `degree`, `graduation_time`, `stage`, `employee_id`) VALUES ('3', '四川文理学院', '达州市通川区', '计算机科学与技术', '本科', '2016-7-01', '2', '1');

/*员工熟人信息*/
INSERT INTO `hotel`.`social_relations` (`id`, `content`, `employee_id`) VALUES ('1', '熟人信息1', '1');
INSERT INTO `hotel`.`social_relations` (`id`, `content`, `employee_id`) VALUES ('2', '熟人信息2', '1');

/*员工工作经历*/
INSERT INTO `hotel`.`work_experience` (`id`, `name`, `supervisor`, `address`, `zip_code`, `phone`, `work_hours`, `position`, `start_time`, `end_time`, `start_salary`, `end_salary`, `leave_reason`, `summary`, `can_contact`, `employee_id`) VALUES ('1', '四川派海科技有限公司', '郭康康', '四川省绵竹市高新开发科技园', '618200', '13778287235', '40', '司机', '2014-06-01', '2015-12-01', '2000', '3000', '工资低工作累', '我很努力，大家都认可我的工作', '1', '1');
INSERT INTO `hotel`.`work_experience` (`id`, `name`, `supervisor`, `address`, `zip_code`, `phone`, `work_hours`, `position`, `start_time`, `end_time`, `start_salary`, `end_salary`, `leave_reason`, `summary`, `can_contact`, `employee_id`) VALUES ('2', '四川有乐信息技术有限公司', '张江', '四川省成都市高新区软件园G区', '273666', '18382921234', '40', '前端', '2015-12-01', '2018-01-01', '3500', '7000', '学不到东西', '很努力', '1', '1');



/*房型*/
INSERT INTO `hotel`.`room_type` (`id`, `name`) VALUES ('1', '单人间');
INSERT INTO `hotel`.`room_type` (`id`, `name`) VALUES ('2', '标准间');
INSERT INTO `hotel`.`room_type` (`id`, `name`) VALUES ('3', '豪华间');
INSERT INTO `hotel`.`room_type` (`id`, `name`) VALUES ('4', '商务间');
INSERT INTO `hotel`.`room_type` (`id`, `name`) VALUES ('5', '行政间');
INSERT INTO `hotel`.`room_type` (`id`, `name`) VALUES ('6', '普通套间');
INSERT INTO `hotel`.`room_type` (`id`, `name`) VALUES ('7', '高级套间');


/*物品*/
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('床', '0', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('地毯', '1', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('电视', '1', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('电脑', '1', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('台灯', '1', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('烧水壶', '1', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('电吹风', '1', '0', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_article` (`name`, `is_check`, `is_clean`, `createdAt`, `updatedAt`) VALUES ('座机', '1', '0', '2017-12-27 02:40:58', '2017-12-27 02:40:58');


/*房间*/
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('101', 'room101', '0', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('102', 'room102', '0', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('103', 'room103', '0', '1', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('104', 'room104', '0', '2', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('105', 'room105', '0', '2', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('106', 'room106', '0', '2', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('201', 'room201', '0', '3', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('202', 'room202', '0', '3', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('203', 'room203', '0', '3', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('204', 'room204', '0', '4', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('205', 'room205', '0', '4', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('206', 'room206', '0', '4', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('301', 'room301', '0', '5', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('302', 'room302', '0', '5', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('303', 'room303', '0', '5', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('304', 'room304', '0', '6', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('305', 'room305', '0', '6', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('306', 'room306', '0', '6', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('401', 'room401', '0', '7', '2017-12-27 02:40:58', '2017-12-27 02:40:58');
INSERT INTO `hotel`.`room_info` (`number`, `qr_code`, `status`, `type_id`, `createdAt`, `updatedAt`) VALUES ('402', 'room402', '0', '7', '2017-12-27 02:40:58', '2017-12-27 02:40:58');


/*房间和物品关联*/
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('1', '1');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('2', '1');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('3', '1');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('5', '1');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('6', '1');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('8', '1');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('1', '2');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('2', '2');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('3', '2');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('5', '2');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('6', '2');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('8', '2');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('1', '7');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('2', '7');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('3', '7');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('4', '7');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('5', '7');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('6', '7');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('7', '7');
INSERT INTO `hotel`.`room_article_rel` (`article_id`, `room_id`) VALUES ('8', '7');


/*工作排班*/
INSERT INTO `hotel`.`work_schedule` (`employee_id`, `start_time`, `end_time`) VALUES ('1', '1514341731', '1514349000');
INSERT INTO `hotel`.`work_schedule` (`employee_id`, `start_time`, `end_time`) VALUES ('1', '1514435400', '1514440800');
INSERT INTO `hotel`.`work_schedule` (`employee_id`, `start_time`, `end_time`) VALUES ('2', '1514413800', '1514421360');



