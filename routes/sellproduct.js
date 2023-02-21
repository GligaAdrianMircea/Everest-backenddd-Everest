const express = require('express')
const sellProductModel = require('../models/productModel')
const { getall } = require('../controllers/sellProductController')
const productModel = require('../models/productModel')
const { updateProduct, getAltele, deleteProduct, getArta, getImbracaminte, getPentruAcasa, getCeasuri, getTehnologie, getNatura, getPapuci, getJucarii, asignUserToList, productsBoughtByYou, actualizareSumaStransa, getnumberofusers, getnumberofproducts, productSoldByYou } = require('../controllers/sellProductController')
const validator = require('validator')
const cloudinary = require('./cloudinary')
const router = express.Router()

router.get('/altele', getAltele)
router.get('/arta', getArta)
router.get('/imbracaminte', getImbracaminte)
router.get('/pentruacasa', getPentruAcasa)
router.get('/ceasuri', getCeasuri)
router.get('/tehnologie', getTehnologie)
router.get('/natura', getNatura)
router.get('/papuci', getPapuci)
router.get('/jucarii', getJucarii)
router.delete('/delete/:id', deleteProduct)
router.patch('/update/:id', updateProduct)
router.post('/asign/user/list/:id', asignUserToList)
router.post('/bought', productsBoughtByYou)
router.patch('/suma_stransa', actualizareSumaStransa)
router.get('/getnumberofusers', getnumberofusers)
router.get('/getnumberofproducts', getnumberofproducts)
router.post('/productssoldbyme', productSoldByYou)
router.post('/post/prod', async(req, res) => {
    const { titlu, categorie,  poza, email, telefon, descriere, locatie, username } = req.body
    var { pret } = req.body
    try{
        if(poza) {
       const uploadRes = await cloudinary.uploader.upload(poza, {
            upload_preset: "EVEREST"
        })
        if(uploadRes){
            var pretul = Number(pret)
            pretul = pretul + pretul*0.1
            pret = pretul.toString()
            const product = await sellProductModel.create({ titlu, categorie,  poza: uploadRes , email, telefon, descriere, pret, locatie, username })
            res.status(200).json(product)
        }
    }
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }

})
router.get('/getall', getall)
router.delete('/deletealldocuments', async(req,res)=>{
    await productModel.deleteMany({})
    res.send('deleted all documents')
})
module.exports = router