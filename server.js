const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const database = require("./models/db");

// exportar models de tabelas
const Cadastro = require("./models/cadastros");
const Login = require("./models/login-usuario");
// const { redirect } = require("express/lib/response");

// Config
// inportar arquivos estaticos
app.use(express.static(path.join(__dirname, "assets")));
// Templete engine com isto nos agora não precisamos rescrever as estruturas básicas do html
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Receber dados com o express
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Rotas
    app.get('/', function(req, res){// Rota principal
        res.render("home");
    });

    app.get('/login', function(req, res){
        res.render("login");
    });
    
    app.get('/cadastro', function(req, res){
        res.render("cadastro");
    });

    app.get('/deposito-de-patentes', function(req, res){
        res.render("deposito-de-patentes");
    });
    // metodos posts
    app.post('/cad', (req, res)=>{// cadastro de usuario
        const novoLogin = Login.create({
            email: req.body.Email,
            senha: req.body.senha
        }).then(()=>{
            res.send('Login com sucesso ;)');
            //res.redirect('/login');
        }).catch(()=>{
            res.send("Login deu errado :(");
        });

        const novoCadastro = Cadastro.create({// inserindo na tabela
            nome: req.body.nome,
            endereco: req.body.endereco,
            contato: req.body.contato,
            cpfcnpj: req.body.cpfcnpj,
            instituicao: req.body.instituicao,
            ocupacao: req.body.ocupacao,
            idlogin: novoLogin.idlogin
        }).then(()=>{
            // res.send('Cadastro realizado com sucesso ;)');
            res.redirect('/login');
        }).catch(()=>{
            res.send("Erro ao gravar dados :(");
        })








        // const Login = require("./models/login-usuario");
        //database.sync();

        /*const novoCadastro = Cadastro.create({// inserindo na tabela
            endereco: req.body.endereco,
            contato: req.body.contato,
            cpfcnpj: req.body.cpfcnpj,
            instituicao: req.body.instituicao,
            ocupacao: req.body.ocupacao,
            // idlogin: novoLogin.idlogin

        }).then(()=>{
            //res.send('Musico registrado com sucesso ;)');
            res.redirect('/login');
        }).catch(()=>{
            res.send("Erro tente novamente :(");
        })*/
    })
    /*app.post('/dep-patente', (req, res)=>{
        //const Cadastro = require("./models/cadastros");
        //database.sync();
        res.redirect('/');
    })
    app.post('/dash-board-nit', (req, res)=>{
        //const Cadastro = require("./models/cadastros");
        //database.sync();
        res.render("dash-board-nit");
    })*/

const PORT = process.env.PORT || 3000    
app.listen(PORT, ()=>{
    console.log("Servidor rodando na port: " + PORT);
});