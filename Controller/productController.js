const ProductModel=require('../Model/product')
const { Validator } = require('node-input-validator');

const product=async(req,res)=>{
    const v = new Validator({
        name: 'required',
        description: 'required'
      });
    
      v.check().then((matched) => {
        if (!matched) {
          res.status(422).send(v.errors);
        }
      });
 // const file = req.file;
    // if(!file) return res.status(400).send('No image in the request')

    // const fileName = file.filename
    // const basePath = `${req.protocol}://${req.get('host')}/productimage/`;

    //**for multiple */
    const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/productimage/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }
    let prod = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        //for single image
        //image: `${basePath}${fileName}`,// "http://localhost:3000/public/upload/image-2323232"
        //**for multiple */
        image: imagesPaths,
        brand: req.body.brand,
        price: req.body.price,
    })

   const pro = await prod.save();

    if(!pro) {
        return res.status(500).send(
            {
                message:"product can not be create"
            }
        )
    }else{
        return res.status(200).send({
            data:pro,
            message:"product added successfully"
        }) 
    }
}


module.exports={product}