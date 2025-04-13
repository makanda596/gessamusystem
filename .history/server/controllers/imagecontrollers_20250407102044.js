
import cloudinary from "cloudinary";
import dotenv from 'dotenv'

dotenv.config();


cloudinary.v2.config({
    cloud_name: "db5pgr14l",
    api_key: "419672131612681",
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
    } catch (error) {
        
    }
}