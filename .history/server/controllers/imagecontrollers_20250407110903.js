
import cloudinary from "cloudinary";
import dotenv from 'dotenv'

dotenv.config();


cloudinary.v2.config({
    cloud_name: "dch4echnq",
    api_key: "636769749966873",
    api_secret: "X6bdb7zw9Gae9IvWahEyzT9nB1o",
});

export const oneImage = async (req,res)=>{
    const {image}= req.body 
    try {
        if(!image){
            return res.json({message:"no image provided"})
        }
        const uploadResponse = await cloudinary.v2.uploader.upload(image)

        const Image =  new Image({
            image: uploadResponse.secure_url
        })
        console.log(image)
    } catch (error) {
        return res.json(error.message)
    }
}