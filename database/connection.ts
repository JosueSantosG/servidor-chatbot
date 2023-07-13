import { Sequelize } from "sequelize";

const database = new Sequelize('postgradobd','postgrado','123456',{
    host: 'localhost',
    dialect: 'mssql',
    //logging:false,
});

export default database;

