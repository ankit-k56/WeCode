const express = require('express')
const router = express.Router()
const {SubmitQuestion} = require('../controllers/submission')
const { GetAllQuestion,PostQuestion,GetQuestion } = require('../controllers/questions')
router.route('/').get(GetAllQuestion).post(PostQuestion)
router.route('/:id').get(GetQuestion)
router.route('/:Qid/submit').post(SubmitQuestion)

module.exports = router