const express = require('express'); //Inyección de la dependencia
const router = express.Router();//Instancia del router
const mongoose = require('../node_modules/mongoose');//Inyección de la dependencia de mongoose
let Person = require('../models/person');//Inyección de la dependencia del modelo person

//Ruta 'persons'
router.get('/persons', function(req, res, next){
    Person.find(function(err, persons){
        if(err) return next(err);
        res.render("persons", {'persons': persons});
    })
});

//Ruta GET parqa renderizar la vista que vamos a enviar los datos de la nueva persona que se agregó en el formulario.
router.get('/person', function (req, res){
    res.render('person');
});

//Ruta GET para acceder a la página principal
router.get('/principal', function (req, res){
    res.render('principal');
});

//Ruta POST para agregar un nuevo documento a la colección
router.post('/addPerson', function(req, res){
   const myPerson = new Person({
       nombre: req.body.nombre,
       edad: req.body.edad,
       tipoSangre: req.body.tipoSangre,
       nss: req.body.nss
    });
    myPerson.save(); //Lo guarda en la base de datos
    res.redirect("./persons") //Redireccionar hacia la lista de personas registradas
});
//Exportar el ruteador
module.exports = router;