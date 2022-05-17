const express = require('express');
const router  = express.Router();
const user = require('../controller/user_controller')
const stringFile = require('../common/string.json')
router.post('/create_user', (req, res) => {
    user.createUser(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err => {
        res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
})

router.post('/login', (req, res) => {
    user.login(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err => {
        res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
})

router.put('/updateUser/:_id', (req, res) => {
    user.updateUser(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err => {
        res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
})

router.get('/getAllUser', (req, res) => {
    user.getAllUser(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err => {
        res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
})

router.get('/searchUser', (req, res) => {
    user.searchUser(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err => {
        res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
})

// router.post('/createQuestion', (req, res) => {
//     user.createQuestion(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => {
//         res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
//     })
// })

// router.get('/getAllQuestions', (req, res) => {
//     user.getAllQuestions(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => {
//         res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
//     })
// })

// router.put('/updateQuestions', (req, res) => {
//     user.updateQuestionsBasedOnRole(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => {
//         res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
//     })
// })

// router.delete('/deleteQuestionBasedOnId/:_id', (req, res) => {
//     user.deleteQuestionBasedOnId(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => {
//         res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
//     })
// })

// router.put('/changeApprovalStatus/:_id', (req, res) => {
//     user.changeApprovalStatus(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => {
//         res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
//     })
// })

// router.get('/questionsListing', (req, res) => {
//     user.questionsListing(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => {
//         res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
//     })
// })



module.exports = router;