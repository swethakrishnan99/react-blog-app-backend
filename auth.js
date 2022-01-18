const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');


const router = express.Router();
router.use(express.json());
const auth = [];
router.use(cors());

router.get("/", (req, res) => {
    res.json(auth);
});

router.post("/", async (req, res) => {
    const copy = auth.filter(copy => { return (req.body.username == copy.username) })
    if (copy.length !== 0) {
        console.log(copy)
        res.status(200).send({ exist: true })
    }
    else {
        try {
            // const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = { username: req.body.username, password: hashedPassword, email: req.body.email }
            auth.push(user)
            res.status(200).send({ exist: false })
        }
        catch {
            res.status(500).send()
        }
    }

})
router.post("/login", async (req, res) => {
    const user = auth.find(user => req.body.username === user.username)
    console.log(req.body)
    console.log(user)
    if (user === undefined) {
        res.status(400).send({ exist: false, match: false })
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send({ exist: true, match: true })
        }
        else {
            res.send({ exist: true, match: false })
        }
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router;