'use strict'
const attend = use('Database')

class AttendanceController {
    async index({ view,request,response }) {
         const HrEmployee = await attend.connection('mssql')
            .raw(`
            SELECT HrEmployee.EmpIDex,HrEmployee.EmplName,dt.After9AM,dt1.Late,dt2.OnTime FROM (SELECT EmpIDex,EmplName FROM HrEmployee WHERE EmpIDex >= 0)HrEmployee
                        INNER JOIN(
                                        SELECT min(HrEmployee.EmpIDex) AS ID,  
                                                min(HrEmployee.EmplName) AS Name,
                                                min(TnA.C_Date) AS _Date
                                                ,min(TnA.C_Time) AS T_Time,
                                                 COUNT(HrEmployee.EmpIDex) AS After9AM
                                                FROM HrEmployee LEFT OUTER JOIN TnA 
                                                  ON HrEmployee.EmpIDex=TnA.C_Unique
                                               WHERE TnA.C_Time BETWEEN '08:59' AND '12:00'
                                              GROUP BY HrEmployee.EmplName
                                       ) AS dt 
                                       ON HrEmployee.EmpIDex = dt.ID   
                        INNER JOIN(
                        SELECT min(HrEmployee.EmpIDex) AS ID,  
                                                min(HrEmployee.EmplName) AS Name,
                                                min(TnA.C_Date) AS _Date
                                                ,min(TnA.C_Time) AS T_Time,
                                                 COUNT(HrEmployee.EmpIDex) AS Late
                                                FROM HrEmployee LEFT OUTER JOIN TnA 
                                                  ON HrEmployee.EmpIDex=TnA.C_Unique
                                               WHERE TnA.C_Time BETWEEN '08:15' AND '12:00'
                                              GROUP BY HrEmployee.EmplName
                        ) AS dt1
                        ON HrEmployee.EmpIDex = dt1.ID
                        INNER JOIN(
                        SELECT min(HrEmployee.EmpIDex) AS ID,  
                                                min(HrEmployee.EmplName) AS Name,
                                                min(TnA.C_Date) AS _Date
                                                ,min(TnA.C_Time) AS T_Time,
                                                 COUNT(HrEmployee.EmpIDex) AS OnTime
                                                FROM HrEmployee LEFT OUTER JOIN TnA 
                                                  ON HrEmployee.EmpIDex=TnA.C_Unique
                                               WHERE TnA.C_Time BETWEEN '06:00' AND '08:15'
                                              GROUP BY HrEmployee.EmplName
                        ) dt2
                        ON HrEmployee.EmpIDex = dt2.ID
                        ORDER BY HrEmployee.EmpIDex
            `)
            return view.render('attendance.table', { HrEmployee: HrEmployee })
    }
    async datarange({ view,request,response }){
      if (request.ajax()){
          const daterange = request.input('daterange')
          const initime = daterange.slice(0,11)
          const fitime = daterange.slice(12,23).trim()
          console.log(fitime)
          const HrEmployee = await attend 
            .raw(`SELECT HrEmployee.EmpIDex,HrEmployee.EmplName,dt.After9AM,dt1.Late,dt2.OnTime 
            FROM (SELECT EmpIDex,EmplName FROM HrEmployee WHERE EmpIDex >= 0)HrEmployee
                        INNER JOIN(
                                        SELECT min(HrEmployee.EmpIDex) AS ID,  
                                                min(HrEmployee.EmplName) AS Name,
                                                min(TnA.C_Date) AS _Date
                                                ,min(TnA.C_Time) AS T_Time,
                                                 COUNT(HrEmployee.EmpIDex) AS After9AM
                                                FROM HrEmployee LEFT OUTER JOIN TnA 
                                                  ON HrEmployee.EmpIDex=TnA.C_Unique
                                               WHERE TnA.C_Time BETWEEN '08:59' AND '12:00'
                                              GROUP BY HrEmployee.EmplName
                                       ) AS dt 
                                       ON HrEmployee.EmpIDex = dt.ID   
                        INNER JOIN(
                        SELECT min(HrEmployee.EmpIDex) AS ID,  
                                                min(HrEmployee.EmplName) AS Name,
                                                min(TnA.C_Date) AS _Date
                                                ,min(TnA.C_Time) AS T_Time,
                                                 COUNT(HrEmployee.EmpIDex) AS Late
                                                FROM HrEmployee LEFT OUTER JOIN TnA 
                                                  ON HrEmployee.EmpIDex=TnA.C_Unique
                                               WHERE TnA.C_Time BETWEEN '08:15' AND '12:00'
                                              GROUP BY HrEmployee.EmplName
                        ) AS dt1
                        ON HrEmployee.EmpIDex = dt1.ID
                        INNER JOIN(
                        SELECT min(HrEmployee.EmpIDex) AS ID,  
                                                min(HrEmployee.EmplName) AS Name,
                                                min(TnA.C_Date) AS _Date
                                                ,min(TnA.C_Time) AS T_Time,
                                                 COUNT(HrEmployee.EmpIDex) AS OnTime
                                                FROM HrEmployee LEFT OUTER JOIN TnA 
                                                  ON HrEmployee.EmpIDex=TnA.C_Unique
                                               WHERE TnA.C_Time BETWEEN '06:00' AND '08:15'
                                              GROUP BY HrEmployee.EmplName
                        ) dt2
                        ON HrEmployee.EmpIDex = dt2.ID
                        WHERE dt2._Date BETWEEN '${initime}' AND '${fitime}' 
                        ORDER BY HrEmployee.EmpIDex
            `)
              return response.send({
                    data: HrEmployee
      })    
    
        }
      }
    }
module.exports = AttendanceController
