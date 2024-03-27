var express = require('express')
var app = express()
app.use(express.json());

const { authenticateToken, generateAccessToken } = require('./auth');
const { getUser, registerUser, tableCreate} = require('./database/repository');

app.post('/api/signUp', (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!password || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }

        registerUser(email, password).then((user) => {
            res.json(user);
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'falha ao cadastrar usuário'})
    }      
});

app.post('/api/signIn', (req, res) => {   
    try{
        const { email, password } = req.body;

        if (!password || !email) {
            return res.status(400).json({ error: 'Email e Senha são obrigatórios' });
        }
    
        getUser(email, password).then((user) => {
            if(!user){
               return res.status(401).json({ error: 'Credenciais inválidas' })
            }

            const {id, email, created_at} = user;
            const access_token = generateAccessToken({id, email, created_at});

            res.json({ access_token });

        }).catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        })
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/privateRoute', authenticateToken, (req, res) => {
    
    res.json(
        {
            "mensagem": "Token JWT válido. Você está autenticado."
        }
    );
})


app.get('/', function (req, res) {
    res.send('running');    
})


app.listen(3000, () => {
    console.log('running on port 3000');
    tableCreate();
})