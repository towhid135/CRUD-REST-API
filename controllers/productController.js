const Product = require("../model/Products");

//get all products
const product_all = async (req,res) =>{
    
   try{
    const products = await Product.find();
    res.json(products);
   }catch(err){
    res.json({message: err})
   }

}
//get single product
const product_details = async (req,res) =>{
    console.log('req.params value: ',req.params);
    try{
        const getSingleProduct = await Product.findById(req.params.productId);
        res.json(getSingleProduct);
    }catch(err){
        res.json({message: err})
    }

}

//add new product
const product_create = async (req,res) =>{
    console.log('request ',req.body);
    const createProduct = new Product({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        details: req.body.details
    })
    createProduct.save().then(
        () => {
            res.json(createProduct);
            console.log('product saved successfully') 
        }
    ).catch((err) => {
        res.json(err);
        console.log("product saving error ", err)
    })
}
//update product
const product_update = async (req,res) =>{
    try{

        const product = {
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            details: req.body.details
        };

        const updateProduct = await Product.findByIdAndUpdate(
            {_id: req.params.productId},
            product
        )
        res.json(updateProduct);

    }catch(err){
        res.json({message: err});
    }
}
//delete product
const product_delete = async (req,res) =>{
    try{
        const deletedProduct = await Product.deleteOne({_id: req.params.productId})
        res.json(deletedProduct);
    }catch(err){
        res.json({message:err});
    }
}

module.exports = {
    product_all,
    product_details,
    product_create,
    product_update,
    product_delete
}