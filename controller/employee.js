let { logUtil, service, dataUtil } = require("../utils");
let { Employee, EmployeeInfo, EduExperience, WorkExperience, SocialRelations, Role, Department } = require('../models');
let ProxyFunc = require('../proxy');
const staticSetting = require("../config/staticSetting");
const async = require('async');  
let { langConfig } = require("../config/lang_config");
let envConfig = require("../config/env_config");




/**
 * 登录
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.loginAction = (req, res, next) => { 
  try{
    const userObj = {
            userName: req.body.username,
            password: service.encrypt(req.body.password, staticSetting.encrypt_key)
        }

      Employee.findOne({
        attributes: ['username','password','roleId'],
        where: userObj,
        order: [['id', 'DESC']]
      })
      .then(result => {
        if(!result) {
          return res.json({
            state: 0,
            msg: langConfig(req).resMsg.loginError
          })
        }

            req.session.userInfo = result.dataValues;
            result.dataValues.powerList = [2001,3002];
            // req.session.LANG = 2;
        res.json({
          state: 1,
          msg: langConfig(req).resMsg.success
        })

        })
      .catch(err => {
          logUtil.error(err, req);
          return res.json({
            state: 0,
            msg: langConfig(req).resMsg.loginFailure
          })
        });
  }catch(err){
      logUtil.error(err, req);
      return res.json({
        state: 0,
        msg: langConfig(req).resMsg.loginFailure
      })   
  }
}





/**
 * 登录注销
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.logOut = (req, res, next) => {
  try{
    console.log("haha")
  }catch(err){
    res.sendStatus(500)
  }

}





/**
 * 员工管理页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_Employees = (req, res, next) => {
    try{
        async.series({
            //全部角色列表
            allRoleList: cb => {
                ProxyFunc.Role.getRoleList({},(err, result) => {
                    if(err){
                       return cb(err, null)
                    }
                    cb(null,result)
                })
            },
            //全部部门列表
            allDepartmentList: cb => {
                ProxyFunc.Department.getDepartmentList({},(err, result) => {
                    if(err){
                       return cb(err, null)
                    }
                    cb(null,result)
                })
            }
            
        }, (err, results) => {
            if(err){
               logUtil.error(err, req);
               return res.render('page500',{layout: null});
            }
            res.render('employees',{
               departmentList: results.allDepartmentList, //所有部门
               roleList: results.allRoleList, //所有角色
            });

        });
        
    }catch(err){
        logUtil.error(err, req);
        return res.render('page500',{layout: null});
    }
}







/**
 * 根据条件分页获取员工列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getEmployeeList = (req, res, next) => {
  try{
        let { pageNow, pageSize, departmentId, roleId } = req.query;
        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

        let queryCriteria = { //员工列表查询条件
           limit: limit,
           offset: offset
        }

        //如果要根据部门查询
        if(departmentId){
           queryCriteria.departmentId = parseInt(departmentId);
        }

        //如果要根据角色查询
        if(roleId){
           queryCriteria.roleId = parseInt(roleId);
        }

        async.series({
            //员工列表
            employeeList: cb => {
                ProxyFunc.Employee.getEmployeeList(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            //所有符合条件员工总数
            allEmployeeCount: cb => {
                ProxyFunc.Employee.allEmployeeCount(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            
        }, (err, results) => {
            if(err){
               logUtil.error(err, req);
               return res.json({
                 state: 0,
                 msg: langConfig(req).resMsg.error
               }) 
            }

            res.json({
              state: 1,
              msg: langConfig(req).resMsg.success,
              data: {
                datalist: results.employeeList, //查询的员工列表
                allDataCount: results.allEmployeeCount,  //所有符合条件员工总数
              }
            }) 
        });
        
    }catch(err){
        logUtil.error(err, req);
        return res.json({
          state: 0,
          msg: langConfig(req).resMsg.error
        })
    }
}








/**
 * 添加员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addEmployee = (req, res, next) => {
    try{
      let { username, password, departmentId, roleId, positionId } = req.body;

      let paramObj = {
           username: username,  //用户名
           password: service.encrypt(password, staticSetting.encrypt_key),  //密码（加密处理）
           departmentId: departmentId,  //部门id
           roleId: roleId,  //角色id
           positionId: positionId,  //职位id
           status: 1  //用户状态
      }
       
    }catch(err){
      logUtil.error(err, req);
        return res.json({
        state: 0,
        msg: langConfig(req).resMsg.error
      })  
    }
}






/**
 * 添加员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addEmployee = (req, res, next) => {
    try{
        let { username, password, departmentId, roleId, positionId } = req.body;

      let paramObj = {
           username: username,  //用户名
           password: service.encrypt(password, staticSetting.encrypt_key),  //密码（加密处理）
           departmentId: departmentId,  //部门id
           roleId: roleId,  //角色id
           positionId: positionId,  //职位id
           status: 1  //用户状态
      }
        //先判断用户是否存在
      Employee.findOne({
        where: { username: username},
        order: [['id', 'DESC']]
      })
      .then(result => {
          if(result) {
              return res.json({
                state: 0,
                msg: langConfig(req).resMsg.hasUser
              })
          }
          Employee.create(paramObj).then(user => {
                res.json({
                state: 1,
                msg: langConfig(req).resMsg.success
              }) 
          }).catch(err => {
              logUtil.error(err, req);
                return res.json({
                    state: 0,
                    msg: langConfig(req).resMsg.error
                  })   
          }) 
      }).catch(err => {
          logUtil.error(err, req);
           return res.json({
                state: 0,
                msg: langConfig(req).resMsg.error
             })   
      }) 
    }catch(err){
      logUtil.error(err, req);
        return res.json({
        state: 0,
        msg: langConfig(req).resMsg.error
      })  
    }
}




/**
 * 修改员工基础信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editBasicInfo = (req, res, next) => {
    try{
        let { id, username, password, departmentId, roleId, positionId } = req.body;

        id = parseInt(id)

      let paramObj = {
           username: username,  //用户名
           password: service.encrypt(password, staticSetting.encrypt_key),  //密码（加密处理）
           departmentId: departmentId,  //部门id
           roleId: roleId,  //角色id
           positionId: positionId//职位id
      }

      Employee.update(paramObj,{
        where: {
          id: id
        }
      }).then(result => {
            res.json({
               state: 1,
               msg: langConfig(req).resMsg.success
            }) 
      }).catch(err => {
        logUtil.error(err, req);
        return res.json({
            state: 0,
            msg: langConfig(req).resMsg.error
          }) 
      })
    }catch(err){
      logUtil.error(err, req);
        return res.json({
        state: 0,
        msg: langConfig(req).resMsg.error
      })  
    }
}






/**
 * 修改员工个人信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editPersonalInfo = (req, res, next) => {
    try{
        let { id, 
              name, 
              ssn, 
              homeAddress, 
              zipCode, 
              age, 
              email, 
              phone, 
              workDay, 
              workHoursWeek, 
              canNight, 
              workNature, 
              workTime, 
              isLegalStatus, 
              haveCriminalRecord, 
              criminalRecord, 
              haveDl, 
              dlNumber, 
              dlIssuedStatus, 
              isJoinedArmy, 
              isMemberNg, 
              militarySpecialty, 
              workExperienceList, 
              eduExperienceList, 
              socialRelationList 
            } = req.body;

        let employeeId = parseInt(id);
        Employee.findById(employeeId)
        .then(employee => {
            //先删除此用户的个人信息
            EmployeeInfo.destroy({
               where: {
                  employeeId: employeeId
               }
            })
            .then(() => {
                //创建用户个人信息新实例
                let info = EmployeeInfo.build({
                   name: name,
                   ssn: ssn,
                   homeAddress: homeAddress,
                   zipCode: zipCode,
                   age: age,
                   email: email,
                   phone: phone,
                   workDay: workDay,
                   workHoursWeek: workHoursWeek,
                   canNight: canNight,
                   workNature: workNature,
                   workTime: workTime,
                   isLegalStatus: isLegalStatus,
                   haveCriminalRecord: haveCriminalRecord,
                   criminalRecord: criminalRecord,
                   haveDl: haveDl,
                   dlNumber: dlNumber,
                   dlIssuedStatus: dlIssuedStatus,
                   isJoinedArmy: isJoinedArmy,
                   isMemberNg: isMemberNg,
                   militarySpecialty: militarySpecialty
                })
                //新实例与用户关联
                return employee.setEmployeeInfo(info)
            })
            .then(() => {
                //删除所有的此员工的工作经历
                return WorkExperience.destroy({
                   where: {
                      employeeId: employeeId
                   }
                })
            })
            .then(() => {
                //批量添加员工工作经历
                let list = dataUtil.strToArray(workExperienceList);
                let dataObj = [];
                for(let i = 0; i < list.length; i++){
                   let obj = WorkExperience.build({
                       name: list[i].name,
                       supervisor: list[i].supervisor,
                       address: list[i].address,
                       zipCode: list[i].zipCode,
                       phone: list[i].phone,
                       workHours: list[i].workHours,
                       position: list[i].position,
                       startTime: list[i].startTime,
                       endTime: list[i].endTime,
                       startSalary: list[i].startSalary,
                       endSalary: list[i].endSalary,
                       leaveReason: list[i].leaveReason,
                       summary: list[i].summary,
                       canContact: list[i].canContact
                   })
                   dataObj.push(obj)
                } 
                return WorkExperience.bulkCreate(dataObj)
                
            })
            .then(result => {
                //绑定员工与新添加的工作经历关联
                return employee.setWorkExperiences(result)
            })
            .then(() => {
                //删除所有的此员工的教育经历
                return EduExperience.destroy({
                   where: {
                      employeeId: employeeId
                   }
                })
            })
            .then(() => {
                //批量添加员工教育经历
                let list = dataUtil.strToArray(SocialRelations);
                let dataObj = [];
                for(let i = 0; i < list.length; i++){
                   let obj = {
                       name: list[i].name,
                       address: list[i].address,
                       major: list[i].major,
                       degree: list[i].degree,
                       graduationTime: list[i].graduationTime,
                       stage: list[i].stage
                   }
                   dataObj.push(obj)
                } 
                return EduExperience.bulkCreate(dataObj)
                
            })
            .then(result => {
                //绑定员工与新添加的教育经历关联
                return employee.setEduExperiences(result)
            })
            .then(() => {
                //删除所有的此员工的社会关系
                return SocialRelations.destroy({
                   where: {
                      employeeId: employeeId
                   }
                })
            })
            .then(() => {
                //批量添加员工社会关系
                let list = dataUtil.strToArray(socialRelationList);
                let dataObj = [];
                for(let i = 0; i < list.length; i++){
                   let obj = {
                       content: list[i].content
                   }
                   dataObj.push(obj)
                } 
                return SocialRelations.bulkCreate(dataObj)
                
            })
            .then(result => {
                //绑定员工与新添加的社会关系关联
                return employee.setSocialRelationss(result)
            })
            .then(() => {
                res.json({
                   state: 1,
                   msg: langConfig(req).resMsg.success
                }) 
            })
            .catch(err => {
                logUtil.error(err, req);
                return res.json({
                    state: 0,
                    msg: langConfig(req).resMsg.error
                  }) 
            })                     
        })
        .catch(err => {
            logUtil.error(err, req);
            return res.json({
                state: 0,
                msg: langConfig(req).resMsg.error
              }) 
        })

    }catch(err){
      logUtil.error(err, req);
        return res.json({
        state: 0,
        msg: langConfig(req).resMsg.error
      })  
    }
}





/**
 * 批量重置用户密码
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.resetPassword = (req, res, next) => {
    try{
        let { ids } = req.body;
        let idList = dataUtil.strToArray(ids);
        let updateList = [];
        Employee.update({password:service.encrypt('111111', staticSetting.encrypt_key)},{
           where: {
               id: idList
           }
        })
        .then(result => {
          res.json({
            state: 1,
            msg: langConfig(req).resMsg.success
          })
        })
        .catch(err => {
            logUtil.error(err, req);
            return res.json({
                      state: 0,
                      msg: langConfig(req).resMsg.error
                   })
      })

    }catch(err){
        logUtil.error(err, req);
        return res.json({
          state: 0,
          msg: langConfig(req).resMsg.error
        })
    }
}





