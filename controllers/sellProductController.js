const Product = require('../models/productModel')
const User = require('../models/userModel')

const getall = async (req,res) => {
    const alldata =  await Product.find({}).sort({ created_at: -1 })
    res.json(alldata)
}
const getJucarii = async (req,res) => {
    const jucarii = await Product.find({ categorie: 'jucarii' }).sort({ created_at: -1 })
    res.json(jucarii)
}
const getPapuci = async (req,res) => {
    const papuci = await Product.find({ categorie: 'papuci' }).sort({ created_at: -1 })
    res.json(papuci)
}
const getNatura = async (req,res) => {
    const natura = await Product.find({ categorie: 'natura' }).sort({ created_at: -1 })
    res.json(natura)
}
const getTehnologie = async (req,res) => {
    const tehnologie = await Product.find({ categorie: 'technologie' }).sort({ created_at: -1 })
    res.json(tehnologie)
}
const getCeasuri = async (req,res) => {
    const ceasuri = await Product.find({ categorie: 'ceasuri' }).sort({ created_at: -1 })
    res.json(ceasuri)
}
const getPentruAcasa = async (req,res) => {
    const ceasuri = await Product.find({ categorie: 'pentru-casa' }).sort({ created_at: -1 })
    res.json(ceasuri)
}
const getImbracaminte = async (req,res) => {
    const îmbrăcăminte = await Product.find({ categorie: 'imbracaminte' }).sort({ created_at: -1 })
    res.json(îmbrăcăminte)
}
const getArta = async (req,res) => {
    const arta = await Product.find({ categorie: 'arta' }).sort({ created_at: -1 })
    res.json(arta)
}
const getAltele = async (req,res) => {
    const altele = await Product.find({ categorie: 'altele' }).sort({ created_at: -1 })
    res.json(altele)
}
const deleteProduct = async (req,res) => {
    const { id } = req.params
    await Product.findByIdAndDelete({ _id: id })
    .catch((error) => res.status(400).json({ error: error }))

    res.status(200).json({ succes: 'succesfuly deleted' })
}
const updateProduct = async (req,res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    if(!product) {
        res.status(400).json({ msg: 'not found' })
    }
    res.status(200).json({product})
}
const asignUserToList =  async (req,res) => {
    const { username } = req.body
    const { id } = req.params
    const exists = await Product.findByIdAndUpdate({ _id: id }, {
        $push: {
            asigned_users: username
        }
    })

    if(exists) {
        res.status(200).json({ msg: exists })
    }else{
        res.status(400).json({ msg: 'fail' })
    }

}
const productsBoughtByYou = async (req,res) => {
    const { username }  = req.body
    const products = await Product.find({ asigned_users: username})

    if(products) {
        res.status(200).json(products)
    }
    if(!products) {
        res.status(400).json({msg: 'Nu ai cumparat niciun produs pana acum'})
    }
}
const productSoldByYou = async (req,res) => {
    const { username } = req.body
    const products = await Product.find({ username: username })

    if(products) {
        res.status(200).json(products)
    }
    if(!products) {
        res.status(400).json({ msg: 'Nu ai vandut niciun produs pana acum' })
    }
}
const actualizareSumaStransa = async (req, res) => {
    try{
        const { unitate_cumparata, id } = req.body
        let product_cu_suma_stransa_initial = await Product.find({ _id: id }).select("suma_stransa")
        let { suma_stransa } = product_cu_suma_stransa_initial[0]
        let suma_stransa_initial = suma_stransa
        suma_stransa_initial +=  unitate_cumparata
        let noua_suma = suma_stransa_initial
        const produsul_actualizat = await Product.findByIdAndUpdate({ _id: id }, { 
            suma_stransa: noua_suma
         })
         res.status(200).json(produsul_actualizat)
    }catch(error){
        res.status(400).json(error)
    }
}
const getnumberofusers = async (req, res) => {
    const allUsersLength = (await User.find({})).length
    res.status(200).json(allUsersLength)
}
const getnumberofproducts = async (req, res) => {
    const allProductsLength = ( await Product.find({})).length
    res.status(200).json(allProductsLength)
}
module.exports = {
    productSoldByYou,
    getnumberofproducts,
    getnumberofusers,
    actualizareSumaStransa,
    productsBoughtByYou,
    asignUserToList,
    updateProduct,
    deleteProduct,
    getall,
    getAltele,
    getArta,
    getImbracaminte,
    getPentruAcasa,
    getCeasuri,
    getTehnologie,
    getNatura,
    getPapuci,
    getJucarii,
}