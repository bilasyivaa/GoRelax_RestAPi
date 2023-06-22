const express = require('express')
const router = express.Router()
const AddGoRelax = require('../models/AddGoRelax')


function result(succ, msg, details) {
    if (details) {
        return {
            success: succ,
            message: msg,
            data: details
        }
    } else {
        return {
            success: succ,
            message: msg,
        }
    }

}
router.get('/', async (req, res) => {
    try {
        const addGoRelax = await AddGoRelax.aggregate([{
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            {
                $set: {
                    id: '$_id',
                    username: {
                        $arrayElemAt: ['$userData.username', 0]
                    }

                    

                }

            },
            {
                $project: {
                    userData: 0,
                    _id: 0
                }
            }

        ]);
        if (addGoRelax.length > 0) {
            res.status(200).json(result(1, 'Data Sukses', addGoRelax))
        } else {
            res.status(404).json(result(0, 'Data Kosong !'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.post('/', async (req, res) => {
    const inputAddGoRelax= new AddGoRelax({
        user_id: req.body.user_id,
        Nama: req.body.Nama,
        Alamat: req.body.Alamat,
        Number: req.body.Number,
        Info: req.body.Info,
        CheckIn: req.body.CheckIn,
        CheckOut: req.body.CheckOut
    })
    try {
        const adGoRelax = await inputAddGoRelax.save()
        res.status(200).json(result(1, 'Data Tamu Hotel Telah Ditambah'))

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})

router.put('/', async (req, res) => {
    const data = {
        id: req.body.id,
        Nama: req.body.Nama,
        Alamat: req.body.Alamat,
        Number: req.body.Number,
        Info: req.body.Info,
        CheckIn: req.body.CheckIn,
        CheckOut: req.body.CheckOut

    }
    try {
        const addGoRelax= await AddGoRelax.updateOne({
            _id: data.id,
        }, data)

        if (addGoRelax.matchedCount > 0) {
            res.status(200).json(result(1, 'Data Tamu Hotel Telah DiUpdate !'))
        } else {
            res.status(200).json(result(1, 'Data Tamu Gagal DiUpdate!'))
        }

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const addGoRelax = await AddGoRelax.deleteOne({
            _id: req.params.id
        })
        if (addGoRelax.deletedCount > 0) {
            res.status(200).json(result(1, 'Data Telah Dihapus!'))
        } else {
            res.status(200).json(result(0, 'Gagal Menghapus Data !'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }

})
module.exports = router