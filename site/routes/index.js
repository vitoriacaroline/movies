const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dbMovies',
    debug: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/testeconexao', function(req, res, next) {
    if (db != null) {
        res.send('A conexão com o banco de dados deu certooooooo! <3');
    } else {
        res.send('Falha na conexão com o banco de dados :(');
    }
});

router.get('/select', function(req, res, next) {
    db.query('SELECT * FROM tbUser;', function(err, rs) {
        res.render('select', { movies: rs });
    });
});

router.get('/form', function(req, res, next) {
    res.render('form', { movies: {} });
});

router.post('/form', function(req, res, next) {
    db.query('INSERT INTO tbUser SET ?', req.body, function(err, rs) {
        res.send('Usuário inserido com sucesso!');
    });
});

router.get('/delete', function(req, res, next) {
    db.query('DELETE FROM tbUser WHERE idUser = ?', req.query.idUser, function(err, rs) {
        res.redirect('/select');
    });
});

router.get('/update', function(req, res, next) {
    db.query('SELECT * FROM tbUser WHERE idUser = ?', req.query.idUser, function(err, rs) {
        res.render('form', { movies: rs[0] })
    });
});

router.post('/update', function(req, res, next) {
    var parametro = [
        req.body,
        req.query.idUser
    ]
    db.query('UPDATE tbUser SET ? WHERE idUser = ?', parametro, function(err, rs) {
        res.redirect('/select'); // APÓS ATUALIZAR, ESTOU DIRECIONANDO PARA A PÁGINA DE EXIBIÇÃO DE USUÁRIOS.
    });
});

module.exports = router;