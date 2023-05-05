const { Router } = require("express");
const { ObjectId } = require("bson");
const mongocollections = require("../config/mongocollections");
const fruits = mongocollections.fruits;

async function addFruits(data) {

    if (data.name == "" || data.name == null) {
        return "Enter fruits name"
    }
    else if (data.color == "" || data.color == null) {
        return "Enter fruits color"
    }
    else if (data.price == "" || data.price == null) {
        return "Enter fruits price"
    }
    else {
        const fruitsCollections = await fruits()
        let dataExiste = await fruitsCollections.findOne({ name: data.name });
        if (dataExiste) {
            return "Aluredy Exisets"
        } else {
            let result = await fruitsCollections.insertOne(data)
            return result;
        }
    }
}

async function findFruits(id) {
    const fruitsCollections = await fruits()
    const fruits_id = { _id: new ObjectId(id) }
    let data;
    if (id) {
        data = await fruitsCollections.findOne(fruits_id);
    } else {
        data = await fruitsCollections.find().toArray();
    }
    return data;
}

async function updateFruits(data, id) {
    const fruitsCollections = await fruits();
    var findData = await fruitsCollections.findOne({ _id: new ObjectId(id) });
    let data_Existe = await fruitsCollections.findOne({
        name: data.name,
        _id: { $ne: new ObjectId(id) }
    });
    if (data_Existe) {
        return "Already Exist"
    }
    else {
        let keys = Object.keys(data);
        let finalData = {}
        keys.forEach((key, index) => {
            if (findData[key] != data[key]) {
                finalData[key] = {
                    oldvalue: findData[key],
                    newvalue: data[key]
                }
            }
        });

        const updatedata = await fruitsCollections.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    data
                }
            }
        )
        return finalData
    }

}

async function deleteFruits(id) {
    const fruitsCollections = await fruits();
    const data = await fruitsCollections.deleteOne({ _id: new ObjectId(id) });
    return data;
}

module.exports = {
    addFruits,
    findFruits,
    updateFruits,
    deleteFruits
}