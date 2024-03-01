import express from 'express'
import Steamutils from 'steamutils'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World')
})
router.post('/', async function (req, res, next) {
  try {
    const { method, params, cookies, is_static } = req.body
    const user = is_static ? Steamutils :  new Steamutils(cookies)
    const result = await user[method].apply(user, params)
    res.json({ result })
  } catch (e) {
    console.error(e)
    res.json({ error: true, message: e.message })
  }
})

export default router
