const Schema = require('../models/data-models');
const MessageSchema = require('../models/messageSchema');

sendMessage = (req, res) => {
    const body = req.body
    const schema = new MessageSchema(body)
    schema.save().then(() => {
        return res.status(201).json(({
            success: true,
            id: schema._id,
            message: 'Links created!',
        }))
    }).catch(err => console.log(err)
    )
}

saveLinks = (req, res) => {
    const body = req.body
    const schema = new Schema(body)
    schema.save().then(() => {
        return res.status(201).json(({
            success: true,
            id: schema._id,
            message: 'Links created!',
        }))
    }).catch(err => console.log(err)
    )
}
updateUserData = async (req, res) => {
    const body = req.body
    await Schema.find({ 'loginSys.login': body.login.value }, (err, data) => {
        if (body.newLogin) {
            data[0].loginSys.login = body.newLogin
            data[0].save().then(() => {
                return res.status(200).json({
                    success: true,
                    login: true,
                    data,
                })
            })
        }
        if (body.mail) {
            console.log(body.mail);

            data[0].loginSys.email = body.mail
            data[0].save().then(() => {
                return res.status(200).json({
                    success: true,
                    mail: true,
                    data,
                })
            })
        }
    })
}

updateLinks = async (req, res) => {
    const body = req.body
    await Schema.find({ 'loginSys.login': req.body.login }, (err, links) => {
        if (body.pass === links[0].loginSys.password) {
            links[0].linkManager.links = body.links
            links[0].linkManager.sectionsNumber = body.sectionsNumber
            links[0].linkManager.config = body.config
            links[0].linkManager.sectionTitles = body.sectionTitles
            links[0].save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: links._id,
                    message: 'Links updated'
                })
            })
        } else if (err) {
            return res.status(400).json({
                err,
                message: 'Error'
            })
        }
    })


}
registerUser = async (req, res) => {
    const body = req.body
    await Schema.find({ 'loginSys.login': body.loginSys.login }, (err, exist) => {
        if (exist.length) {
            return res.status(200).json({
                login: 'login already exist'
            })
        } else {
            Schema.find({ 'loginSys.email': body.loginSys.email }, (err, exist) => {
                if (exist.length) {
                    return res.status(200).json({
                        mail: 'email already exist'
                    })
                } else {
                    const schema = new Schema(body)
                    schema.save().then(() => {
                        return res.status(201).json(({
                            success: true,
                            id: schema._id,
                            message: 'Links created!',
                        }))
                    })
                }
            })
        }
    })
}

logInUser = async (req, res) => {
    const body = req.body
    await Schema.find({ 'loginSys.login': body.login }, (err, exist) => {

        if (exist.length) {

            if (body.pass === exist[0].loginSys.password) {
                return res.status(200).json({
                    isOK: true,
                    message: 'ok',
                    data: exist,
                })
            } else {
                return res.status(200).json({
                    isOK: false,
                    message: 'incorect password',
                    pass: true
                })
            }
        } else {
            return res.status(200).json({
                isOK: false,
                message: 'acconunt with this login not found',
                login: true,
            })
        }
    })
}



module.exports = {
    saveLinks,
    updateLinks,
    registerUser,
    logInUser,
    updateUserData,
    sendMessage,
}