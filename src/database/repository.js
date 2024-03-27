const sqlite3 = require('sqlite3').verbose();
const CryptoJS = require("crypto-js");
const { v4: uuid } = require('uuid');

const db = new sqlite3.Database('src/database/database.db');

function tableCreate() {   
    db.run("CREATE TABLE IF NOT EXISTS User (id TEXT PRIMARY KEY, email TEXT, password TEXT, created_at TEXT)", 
    (result) => console.log('success'));
}

const getUser = (email, password) => {  

    return new Promise((resolve, reject) => {        
        db.get("SELECT * FROM User WHERE email = ?", [email], (err, row) => {
            if (err) {   
                reject(err);                
            }     
            
            var bytes  = CryptoJS.AES.decrypt(row?.password, process.env.TOKEN_SECRET);
            var storagePassword = bytes.toString(CryptoJS.enc.Utf8);
            
            if(storagePassword === password){
                resolve(row);    
            } else {
                resolve(null);
            }
        });  
    })
}

const registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const newUser = {
            id: uuid(),
            email,
            password: CryptoJS.AES.encrypt(password, process.env.TOKEN_SECRET).toString(),
            created_at: new Date().toISOString()
        }

        db.run("INSERT INTO User (id, email, password, created_at) VALUES (?, ?, ?, ?)", 
        [
            newUser.id, 
            newUser.email, 
            newUser.password, 
            newUser.created_at
        ], 
        function(err) {
            if (err) {
                console.error(err);
                reject(err)                
            }
            resolve({ id: this.lastID });
        }); 

    });   
}

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
        } else {
            console.log('Conexão com o banco de dados fechada');
        }
        process.exit();
    });
});

module.exports = { getUser, registerUser, tableCreate}