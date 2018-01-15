let { logUtil, service, dataUtil } = require("../utils");
let { Employee, EmployeeInfo, EduExperience, WorkExperience, SocialRelations, Role, Department } = require('../models');



/**
 * 根据条件获取员工列表
 * @param  {object}   queryCriteria  查询条件
 * @param  {Function} cb  回调函数
 * @return {null}     
 */
 exports.getEmployeeList = (queryCriteria, cb) => {
    try{
        let queryObj = {
            attributes: ['id','username','password','status'],
            order: [['id', 'DESC']],
            where: {},
            include: [
            {
                model: Role,
                attributes: ['id','name']
            },{
                model: Department,
                attributes: ['id','name']
            },{
                model: EmployeeInfo,
                attributes: ['id','name','phone']
            }]
        }       

        
        queryObj.limit = queryCriteria.limit;   //查询限制条数
        queryObj.offset = queryCriteria.offset;  //查询起始位置

        //根据部门查询
        if(queryCriteria.departmentId){
           queryObj.where.departmentId = queryCriteria.departmentId;
        }

        //根据角色查询
        if(queryCriteria.roleId){
           queryObj.where.roleId = queryCriteria.roleId;
        }
        
        Employee.findAll(queryObj)
        .then(result => {
            cb(null,result)
        })
        .catch(err => {
            cb(err,null)
        })
    }catch(err){
        cb(err,null);
    }
 }





 /**
 * 查询所有符合条件员工总数
 * @param  {Function} cb the next func
 * @return {null}     
 */
 exports.allEmployeeCount = (queryCriteria, cb) => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {}
        }

        //根据部门查询
        if(queryCriteria.departmentId){
           queryObj.where.departmentId = queryCriteria.departmentId;
        }

        //根据角色查询
        if(queryCriteria.roleId){
           queryObj.where.roleId = queryCriteria.roleId;
        }


        Employee.count(queryObj)
        .then(result => {
            cb(null,result)
        })
        .catch(err => {
            cb(err,null)
        })
    }catch(err){
        cb(err,null)
    }
 }



