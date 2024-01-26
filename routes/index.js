import express from 'express'
import Steamutils from 'steamutils'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World')
})
router.post('/', async function (req, res, next) {
  try {
    const { method, params, cookies } = req.body
    const user = new Steamutils(cookies)
    const self = typeof user[method] === 'function' ? user : Steamutils
    const result = await self[method].apply(self, params)
    res.json({ result })
  } catch (e) {
    console.error(e)
    res.json({ error: true, message: e.message })
  }
})

export default router
