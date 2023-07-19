import { Sequelize } from "sequelize";

const database = new Sequelize('heroku_db0e206d02f0cbd','ba416f7d93aa44','5aa2da3a',{
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    //logging:false,
});

export default database;
