/*Conectamos la base de datos */

import { Sequelize } from 'sequelize'

const db = new Sequelize('nodedb', 
                         'root', 
                         'Javv2022$', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
})

export default db
