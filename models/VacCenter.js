// const { model } = require('mongoose');
const sql = require('../config/vacCenterDB');

//constructor

const VacCenter = function(vacCenter){
    this.id = vacCenter.id;
    this.name = vacCenter.name;
    this.tel = vacCenter.tel;
};

VacCenter.getAll = result =>{
    // console.log("enter get all of vaccenter");
    sql.query("SELECT * FROM vacCenters;", (err , res) => {
        if(err){
            console.log('error: ' , err);
            result(err, null)
            return;
        }
        console.log("vacCenters: " , res);
        result(null , res);
        
    });
};

module.exports = VacCenter;