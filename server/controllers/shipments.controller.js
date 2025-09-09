import ShipmentsModel from '../models/shipments.model.js'

export async function createShipmentsController(request,response)
{
    const {origin,destination,shipment_number} = request.body;

    console.log(origin)
    console.log(destination)
    console.log(shipment_number)

    if(!origin || !destination)
    {
        return response.status(404).json({
            success:false,
            message:"Origin and destination are required fields"
        })
    }

    const payload={
        shipment_number:shipment_number,
        hops:[
            origin,
            destination
        ]

    }

    const shipment=await ShipmentsModel.create(payload)

    const shipmentnew=await ShipmentsModel.findOne({shipment_number:shipment_number},"-_id -__v")


    return response.status(201).json({
        success:true,
        message:"Shipment created successfully.",
        data:shipmentnew
    })



}


export async function addHopsToRouteController(request,response)
{
    const{previous_hop,next_hop,new_hop}=request.body
    console.log(previous_hop)
    console.log(next_hop)
    console.log(new_hop)

    const shipment_number=request.params
    console.log(shipment_number.shipment_number)

    const shipmentexist=await ShipmentsModel.findOne({shipment_number:shipment_number.shipment_number})


    if(!shipmentexist)
    {
        return response.status(404).json({
            success:false,
            message:"Shipment with ID not found"
        })
    }


   // const shipment=await ShipmentsModel.findOne({shipment_number:shipment_number.shipment_number})

   const payload={
    hops:[
        previous_hop,
        new_hop,
        next_hop

        
    ]
   }

    const updateshipment=await ShipmentsModel.updateOne({shipment_number:shipment_number.shipment_number},payload,{new:true})
    const shipment=await ShipmentsModel.findOne({shipment_number:shipment_number.shipment_number},"-_id -__v")



    return response.json({
        success:true,
        message:"Hop added successfully.",
        data:shipment
    })
}





