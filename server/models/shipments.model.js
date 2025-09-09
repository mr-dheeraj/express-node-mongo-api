import mongoose from "mongoose"

const shipmentSchema=mongoose.Schema({
    shipment_number:{
        type:String,
        unique:true
    },
    hops:{
        type:[String],
        required:[true,"Provide origin & destination"]

    }
})

const ShipmentsModel=mongoose.model("shipments",shipmentSchema)

export default ShipmentsModel
