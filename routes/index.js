import express from 'express'
import Steamutils, {ResponseError} from 'steamutils'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('steamutilremote Hello World')
})
router.post('/:method', async function (req, res, next) {
    try {
        const body = req.body || {};
        const method = req.url.replace(/^\//, "").trim() || body.method;
        const {params, cookies, is_static} = body
        const user = is_static ? Steamutils : new Steamutils(cookies)
        const result = await user[method].apply(user, params)
        if (result instanceof ResponseError) {
            return res.json({error: true, message: result.message})
        }
        res.json({result})
    } catch (e) {
        console.error(e)
        res.json({error: true, message: e.message})
    }
})

export default router
