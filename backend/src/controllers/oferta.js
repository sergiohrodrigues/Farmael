import { Router } from 'express'
import multer from 'multer';
import { listaOferta, createOferta, deleteOferta, updateOferta } from '../services/oferta'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      const fileName = new Date().getTime().toString()
      const extension = '.jpg'; 
  
      const modifiedFileName = fileName + extension;

    cb(null, modifiedFileName);
  }
});
    
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    const userList = await listaOferta()
    res.send(userList)
})

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const fileNameImage = req.file.filename
        const idUnico = uuidv4()
        const body = req.body
        body.id = idUnico
        body.fileNameImage = fileNameImage,
        body. quantidade = 1
        const user = await createOferta(body)
        res.status(201).send(user)
    } catch (err) {
       res.status(400).send(err)
    }
})

router.delete('/:userId', async (req, res) => {
    await deleteOferta(req.params.userId)
    res.send()
})

router.put('/:userId', async (req, res) => {
    await updateOferta(req.params.userId, req.body)
    res.send()
})

export default router