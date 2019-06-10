var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/u3',{useNewUrlParser:true});

//varruyendo el esquema
var productSchema = new mongoose.Schema({
    code:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    }
});

//Modelo
var Product = mongoose.model('Product', productSchema, 'products');

//Definir EndPoints
var productRouter = express.Router();

productRouter.post("/", (req, res)=>{
    var product = req.body;
    Product.create(product)
    .then(data=>{
        console.log(data);
        res.status(200);
        res.json({
            code: 200,
            msg: "Saved!!",
            datail: data
        });
    })
    .catch(error => {
        console.log(error);
        res.status(400);
        res.json({
            code: 400,
            msg: "No se pudo insertar!!",
            datail: error
        });
    });
});

//Configurando servidor express
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/products", productRouter);

//Configurando el servidor Http
var server = require('http').Server(app);
var port = 3002;

//Ejecutando el servidor
server.listen(port);
console.log(`Running on port ${port}`);
