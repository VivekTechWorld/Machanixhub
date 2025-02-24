const service=require('../models/Service');

exports.getService=async(req,res)=>
{
    try
    {

        const services=await service.find();
        res.json({services});
        console.log(service);
    }
    catch(error)
    {
        res.status(500).json({message:"Error in the fetching the servics ",error:error.message});
    }
}
