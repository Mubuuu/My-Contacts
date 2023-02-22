import express from 'express'
import contactController from '../controllers/contactController.js'
import validateToken from '../middleware/validateTokenHandler.js'
const router = express.Router()

router.use(validateToken)
router.route('/').get(contactController.getContacts).post(contactController.createContact)
router.route('/:id').get(contactController.getContact).put(contactController.updateContact).delete(contactController.deleteContact)

export default router   