require("./global")

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const delay = ms => (ms) && new Promise(resolve => setTimeout(resolve, ms))

const getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error in getBuffer: ${e}`)
}
}

exports.makeWASocket = (connectionOptions, options = {}) => {
const viper = makeWASocket(connectionOptions)

viper.inspectLink = async (code) => {
        const extractGroupInviteMetadata = (content) => {
        const group = getBinaryNodeChild(content, "group");
        const descChild = getBinaryNodeChild(group, "description");
        let desc, descId;
        if (descChild) {
        desc = getBinaryNodeChild(descChild, "body").content.toString();
        descId = descChild.attrs.id;
        }
        const groupId = group.attrs.id.includes("@") ? group.attrs.id : group.attrs.id + "@g.us";
        const metadata = {
        id: groupId,
        subject: group.attrs.subject || "Tidak ada",
        creator: group.attrs.creator || "Tidak terdeteksi",
        creation: group.attrs.creation || "Tidak terdeteksi",
        desc,
        descId,
        };
        return metadata;
        }
        let results = await viper.query({
        tag: "iq",
        attrs: {
        type: "get",
        xmlns: "w:g2",
        to: "@g.us",
        },
        content: [{ tag: "invite", attrs: { code } }],
        });
        return extractGroupInviteMetadata(results);
}

function updateNameToDb(contacts) {
        if (!contacts) return
        for (let contact of contacts) {
        let id = viper.decodeJid(contact.id)
        if (!id) continue
        let chats = viper.contacts[id]
        if (!chats) chats = { id }
        let chat = {
        ...chats,
        ...({
        ...contact, id, ...(id.endsWith('@g.us') ?
        { subject: contact.subject || chats.subject || '' } :
        { name: contact.notify || chats.name || chats.notify || '' })
        } || {})
        }
        viper.contacts[id] = chat
        }
}

viper.ev.on('contacts.upsert', updateNameToDb)
viper.ev.on('groups.update', updateNameToDb)

viper.loadMessage = (messageID) => {
        return Object.entries(viper.chats)
        .filter(([_, { messages }]) => typeof messages === 'object')
        .find(([_, { messages }]) => Object.entries(messages)
        .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
        ?.[1].messages?.[messageID]
}

viper.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {}
        return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
}

if (viper.user && viper.user.id) viper.user.jid = viper.decodeJid(viper.user.id)
viper.chats = {}
viper.contacts = {}

viper.sendMessageV2 = async (chatId, message, options = {}) => {
        let generate = await generateWAMessage(chatId, message, options)
        let type2 = getContentType(generate.message)
        if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
        if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
        return await viper.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}

viper.logger = {
        ...viper.logger,
        info(...args) { console.log(chalk.bold.rgb(57, 183, 16)(`INFO [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.cyan(...args)) },
        error(...args) { console.log(chalk.bold.rgb(247, 38, 33)(`ERROR [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.rgb(255, 38, 0)(...args)) },
        warn(...args) { console.log(chalk.bold.rgb(239, 225, 3)(`WARNING [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.keyword('orange')(...args)) }
}
   
viper.getFile = async (PATH, returnAsFilename) => {
        let res, filename
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
        }
        if (data && returnAsFilename && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
        return {
        res,
        filename,
        ...type,
        data
        }
}

viper.waitEvent = (eventName, is = () => true, maxTries = 25) => {
        return new Promise((resolve, reject) => {
        let tries = 0
        let on = (...args) => {
        if (++tries > maxTries) reject('Max tries reached')
        else if (is()) {
        viper.ev.off(eventName, on)
        resolve(...args)
        }
        }
        viper.ev.on(eventName, on)
        })
}

viper.sendMedia = async (jid, path, quoted, options = {}) => {
        let { ext, mime, data } = await viper.getFile(path)
        messageType = mime.split("/")[0]
        pase = messageType.replace('application', 'document') || messageType
        return await viper.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
}

viper.sendContact = async (jid, number, name, quoted, options) => {
        let njid = number.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` 
        let vcard = `BEGIN:VCARD
        VERSION:3.0
        FN:${name.replace(/\n/g, '\\n')}
        TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
        END:VCARD`
        return await viper.sendMessage(jid, {
        contacts: {
        displayName: `${name}`,
        contacts: [{  }],
        ...options
        }
        },
        {
        quoted,
        ...options
        })
}

viper.setStatus = async (status) => {
        return await viper.query({
        tag: 'iq',
        attrs: {
        to: 's.whatsapp.net',
        type: 'set',
        xmlns: 'status',
        },
        content: [
        {
        tag: 'status',
        attrs: {},
        content: Buffer.from(status, 'utf-8')
        }
        ]
        })
}

viper.reply = (jid, text = '', quoted, options) => {
        return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : viper.sendMessage(jid, { ...options, text }, { quoted, ...options })
}

viper.sendStimg = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await viper.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
}
    
viper.sendStvid = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await viper.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
}

viper.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
        let msg = proto.Message.fromObject({
        groupInviteMessage: proto.GroupInviteMessage.fromObject({
        inviteCode,
        inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
        groupJid: jid,
        groupName: groupName ? groupName : this.getName(jid),
        caption
        })
        })
        let message = await this.prepareMessageFromContent(participant, msg, options)
        await this.relayWAMessage(message)
        return message
}

viper.cMod = async (jid, message, text = '', sender = viper.user.jid, options = {}) => {
        if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
        let copy = message.toJSON()
        delete copy.message.messageContextInfo
        delete copy.message.senderKeyDistributionMessage
        let mtype = Object.keys(copy.message)[0]
        let msg = copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') {
        msg[mtype] = { ...content, ...options }
        msg[mtype].contextInfo = {
        ...(content.contextInfo || {}),
        mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
        }
        }
        if (copy.participant) sender = copy.participant = sender || copy.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = areJidsSameUser(sender, viper.user.id) || false
        return proto.WebMessageInfo.fromObject(copy)
}
    
viper.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
        let m = generateForwardMessageContent(message, !!forwardingScore)
        let mtype = Object.keys(m)[0]
        if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
        m = generateWAMessageFromContent(jid, m, { ...options, userJid: viper.user.id })
        await viper.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
        return m
}
    
viper.downloadM = async (m, type, filename = '') => {
        if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
        const stream = await downloadContentFromMessage(m, type)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        if (filename) await fs.promises.writeFile(filename, buffer)
        return filename && fs.existsSync(filename) ? filename : buffer
}
    
viper.downloadMed = async (message, filename, attachExtension = true) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
}

viper.chatRead = async (jid, participant, messageID) => {
        return await viper.sendReadReceipt(jid, participant, [messageID])
}

viper.parseMention = (text = '') => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

viper.saveName = async (id, name = '') => {
        if (!id) return
        id = viper.decodeJid(id)
        let isGroup = id.endsWith('@g.us')
        if (id in viper.contacts && viper.contacts[id][isGroup ? 'subject' : 'name'] && id in viper.chats) return
        let metadata = {}
        if (isGroup) metadata = await viper.groupMetadata(id)
        let chat = { ...(viper.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
        viper.contacts[id] = chat
        viper.chats[id] = chat
}

viper.getName = async (jid = '', withoutContact = false) => {
        jid = viper.decodeJid(jid)
        withoutContact = viper.withoutContact || withoutContact
        let v
        if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
        v = viper.chats[jid] || {}
        if (!(v.name || v.subject)) v = await viper.groupMetadata(jid) || {}
        resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = jid === '0@s.whatsapp.net' ? {
        jid,
        vname: 'WhatsApp'
        } : areJidsSameUser(jid, viper.user.id) ?
        viper.user :
        (viper.chats[jid] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international').replace(new RegExp("[()+-/ +/]", "gi"), "") 
}
    
viper.processMessageStubType = async(m) => {
        if (!m.messageStubType) return
        const chat = viper.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
        if (!chat || chat === 'status@broadcast') return
        const emitGroupUpdate = (update) => {
        ev.emit('groups.update', [{ id: chat, ...update }])
        }
        switch (m.messageStubType) {
        case WAMessageStubType.REVOKE:
        case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
        emitGroupUpdate({ revoke: m.messageStubParameters[0] })
        break
        case WAMessageStubType.GROUP_CHANGE_ICON:
        emitGroupUpdate({ icon: m.messageStubParameters[0] })
        break
        default: {
        console.log({
        messageStubType: m.messageStubType,
        messageStubParameters: m.messageStubParameters,
        type: WAMessageStubType[m.messageStubType]
        })
        break
        }
        }
        const isGroup = chat.endsWith('@g.us')
        if (!isGroup) return
        let chats = viper.chats[chat]
        if (!chats) chats = viper.chats[chat] = { id: chat }
        chats.isChats = true
        const metadata = await viper.groupMetadata(chat).catch(_ => null)
        if (!metadata) return
        chats.subject = metadata.subject
        chats.metadata = metadata
}

viper.insertAllGroup = async() => {
        const groups = await viper.groupFetchAllParticipating().catch(_ => null) || {}
        for (const group in groups) viper.chats[group] = { ...(viper.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
        return viper.chats
}

viper.pushMessage = async(m) => {
        if (!m) return
        if (!Array.isArray(m)) m = [m]
        for (const message of m) {
        try {
        if (!message) continue
        if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) viper.processMessageStubType(message).catch(console.error)
        const _mtype = Object.keys(message.message || {})
        const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
        (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
        _mtype[_mtype.length - 1]
        const chat = viper.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
        if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
        let context = message.message[mtype].contextInfo
        let participant = viper.decodeJid(context.participant)
        const remoteJid = viper.decodeJid(context.remoteJid || participant)
        let quoted = message.message[mtype].contextInfo.quotedMessage
        if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
        let qMtype = Object.keys(quoted)[0]
        if (qMtype == 'conversation') {
        quoted.extendedTextMessage = { text: quoted[qMtype] }
        delete quoted.conversation
        qMtype = 'extendedTextMessage'
        }
        if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
        quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
        const isGroup = remoteJid.endsWith('g.us')
        if (isGroup && !participant) participant = remoteJid
        const qM = {
        key: {
        remoteJid,
        fromMe: areJidsSameUser(viper.user.jid, remoteJid),
        id: context.stanzaId,
        participant,
        },
        message: JSON.parse(JSON.stringify(quoted)),
        ...(isGroup ? { participant } : {})
        }
        let qChats = viper.chats[participant]
        if (!qChats) qChats = viper.chats[participant] = { id: participant, isChats: !isGroup }
        if (!qChats.messages) qChats.messages = {}
        if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
        let qChatsMessages
        if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)) // maybe avoid memory leak
        }
        }
        if (!chat || chat === 'status@broadcast') continue
        const isGroup = chat.endsWith('@g.us')
        let chats = viper.chats[chat]
        if (!chats) {
        if (isGroup) await viper.insertAllGroup().catch(console.error)
        chats = viper.chats[chat] = { id: chat, isChats: true, ...(viper.chats[chat] || {}) }
        }
        let metadata, sender
        if (isGroup) {
        if (!chats.subject || !chats.metadata) {
        metadata = await viper.groupMetadata(chat).catch(_ => ({})) || {}
        if (!chats.subject) chats.subject = metadata.subject || ''
        if (!chats.metadata) chats.metadata = metadata
        }
        sender = viper.decodeJid(message.key?.fromMe && viper.user.id || message.participant || message.key?.participant || chat || '')
        if (sender !== chat) {
        let chats = viper.chats[sender]
        if (!chats) chats = viper.chats[sender] = { id: sender }
        if (!chats.name) chats.name = message.pushName || chats.name || ''
        }
        } else if (!chats.name) chats.name = message.pushName || chats.name || ''
        if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
        chats.isChats = true
        if (!chats.messages) chats.messages = {}
        const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, viper.user.id)
        if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
        delete message.message.messageContextInfo
        delete message.message.senderKeyDistributionMessage
        chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
        let chatsMessages
        if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
        }
        } catch (e) {
        console.error(e)
        }
        }
}
    
viper.getBusinessProfile = async (jid) => {
        const results = await viper.query({
        tag: 'iq',
        attrs: {
        to: 's.whatsapp.net',
        xmlns: 'w:biz',
        type: 'get'
        },
        content: [{
        tag: 'business_profile',
        attrs: { v: '244' },
        content: [{
        tag: 'profile',
        attrs: { jid }
        }]
        }]
        })
        const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile')
        if (!profiles) return {} // if not bussines
        const address = getBinaryNodeChild(profiles, 'address')
        const description = getBinaryNodeChild(profiles, 'description')
        const website = getBinaryNodeChild(profiles, 'website')
        const email = getBinaryNodeChild(profiles, 'email')
        const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category')
        return {
        jid: profiles.attrs?.jid,
        address: address?.content.toString(),
        description: description?.content.toString(),
        website: website?.content.toString(),
        email: email?.content.toString(),
        category: category?.content.toString(),
        }
}

viper.msToDate = (ms) => {
        let days = Math.floor(ms / (24 * 60 * 60 * 1000))
        let daysms = ms % (24 * 60 * 60 * 1000)
        let hours = Math.floor((daysms) / (60 * 60 * 1000))
        let hoursms = ms % (60 * 60 * 1000)
        let minutes = Math.floor((hoursms) / (60 * 1000))
        let minutesms = ms % (60 * 1000)
        let sec = Math.floor((minutesms) / (1000))
        return days + " Hari " + hours + " Jam " + minutes + " Menit"
}
    
viper.msToTime = (ms) => {
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
        return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}
    
viper.msToHour = (ms) => {
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
        return [h + ' Jam '].map(v => v.toString().padStart(2, 0)).join(' ')
}
    
viper.msToMinute = (ms) => {
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
        return [m + ' Menit '].map(v => v.toString().padStart(2, 0)).join(' ')
}
    
viper.msToSecond = (ms) => {
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
        return [s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

viper.clockString = (ms) => {
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
        return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}
    
viper.join = (arr) => {
        let construct = []
        for (let i = 0; i < arr.length; i++) {
        construct = construct.concat(arr[i])
        }
        return construct
}

viper.pickRandom = (list) => {
        return list[Math.floor(list.length * Math.random())]
}

viper.delay = (ms) => {
        return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

viper.filter = (text) => {
        let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
        if (/[aiueo][aiueo]([qwrtypsdfghjklzxcvbnm])?$/i.test(text)) return text.substring(text.length - 1)
        else {
        let res = Array.from(text).filter(v => mati.includes(v))
        let resu = res[res.length - 1]
        for (let huruf of mati) {
        if (text.endsWith(huruf)) {
        resu = res[res.length - 2]
        }
        }
        let misah = text.split(resu)
        return resu + misah[misah.length - 1]
        }
}

viper.format = (...args) => {
        return util.format(...args)
}
    
viper.serializeM = (m) => {
        return exports.smsg(viper, m)
}

viper.sendText = (jid, text, quoted = '', options) => viper.sendMessage(jid, { text: text, ...options }, { quoted })
    
viper.sendImage = async (jid, path, caption = '', setquoted, options) => {
        let buffer = Buffer.isBuffer(path) ? path : await getBuffer(path)
        return await viper.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted : setquoted})
}
    
viper.sendVideo = async (jid, yo, caption = '', quoted = '', gif = false, options) => {
        return await viper.sendMessage(jid, { video: yo, caption: caption, gifPlayback: gif, ...options }, { quoted })
}
    
viper.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await viper.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}
    
viper.sendTextWithMentions = async (jid, text, quoted, options = {}) => viper.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
    
viper.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', jpegThumbnail, caption = 'Invitation to join my WhatsApp group', options = {}) => {
        let msg = WAProto.Message.fromObject({
        groupInviteMessage: WAProto.GroupInviteMessage.fromObject({
        inviteCode,
        inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : + new Date(new Date + (3 * 86400000)),
        groupJid: jid,
        groupName: groupName ? groupName : (await viper.groupMetadata(jid)).subject,
        jpegThumbnail: jpegThumbnail ? (await getBuffer(jpegThumbnail)).buffer : '',
        caption
        })
        })
        const m = generateWAMessageFromContent(participant, msg, options)
        return await viper.relayMessage(participant, m.message, { messageId: m.key.id })
}

viper.sendPoll = async (jid, title = '', but = []) => {
        let pollCreation = generateWAMessageFromContent(jid,
        proto.Message.fromObject({
        pollCreationMessage: {
        name: title,
        options: but,
        selectableOptionsCount: but.length
        }}),
        { userJid: jid })
        return viper.relayMessage(jid, pollCreation.message, { messageId: pollCreation.key.id })
}

viper.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
    }
    let type = await FileType.fromBuffer(buffer)

    let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
}
    
viper.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.type ? message.type.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
} 
    

Object.defineProperty(viper, 'name', {
value: { ...(options.chats || {}) },
configurable: true,
})
if (viper.user?.id) viper.user.jid = viper.decodeJid(viper.user.id)
store.bind(viper.ev)
return viper
}

exports.smsg = (viper, m, hasParent) => {
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    if (m.key) {
    m.id = m.key.id
    m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
    m.chat = viper.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
    m.now = m.messageTimestamp
    m.isGroup = m.chat.endsWith('@g.us')
    m.sender = viper.decodeJid(m.key.fromMe && viper.user.id || m.participant || m.key.participant || m.chat || '')
    m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, viper.user.id)
    }
    if (m.message) {
    let mtype = Object.keys(m.message)
    m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || // Sometimes message in the front
    (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3!
    mtype[mtype.length - 1] // common case
    m.type = getContentType(m.message)
    m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.type])
    if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
    if (m.mtype == 'protocolMessage' && m.msg.key) {
    if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
    if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
    m.msg.key.fromMe = viper.decodeJid(m.msg.key.participant) === viper.decodeJid(viper.user.id)
    if (!m.msg.key.fromMe && m.msg.key.remoteJid === viper.decodeJid(viper.user.id)) m.msg.key.remoteJid = m.sender
    }
    m.text = m.msg || ''
    m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
    let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
    if (m.quoted) {
    let type = Object.keys(m.quoted)[0]
    m.quoted = m.quoted[type]
    if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
    m.quoted.mtype = type
    m.quoted.id = m.msg.contextInfo.stanzaId
    m.quoted.chat = viper.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
    m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
    m.quoted.sender = viper.decodeJid(m.msg.contextInfo.participant)
    m.quoted.fromMe = m.quoted.sender === viper.user.jid
    m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
    m.quoted.name = viper.getName(m.quoted.sender)
    m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
    let vM = m.quoted.fakeObj = M.fromObject({
    key: {
    fromMe: m.quoted.fromMe,
    remoteJid: m.quoted.chat,
    id: m.quoted.id
    },
    message: quoted,
    ...(m.isGroup ? { participant: m.quoted.sender } : {})
    })
    m.getQuotedObj = m.getQuotedMessage = async () => {
    if (!m.quoted.id) return null
    let q = M.fromObject(await viper.loadMessage(m.quoted.id) || vM)
    return exports.smsg(viper, q)
    }
    if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => viper.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
    m.quoted.reply = (text, chatId, options) => viper.reply(chatId ? chatId : m.chat, text, vM, options)
    m.quoted.replys = (text, chatId, options) => viper.replys(chatId ? chatId : m.chat, text, vM, options)
    m.quoted.copy = () => exports.smsg(viper, M.fromObject(M.toObject(vM)))    
    m.quoted.forward = (jid, forceForward = false) => viper.forwardMessage(jid, vM, forceForward)
    m.quoted.copyNForward = (jid, forceForward = true, options = {}) => viper.copyNForward(jid, vM, forceForward, options)
    m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => viper.cMod(jid, vM, text, sender, options)
    m.quoted.delete = () => viper.sendMessage(m.quoted.chat, { delete: vM.key })
    }
    }
    m.name = !nullish(m.pushName) && m.pushName || viper.getName(m.sender)
    if (m.msg && m.msg.url) m.download = (saveToFile = false) => viper.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
    m.reply = (text, chatId, options) => viper.reply(chatId ? chatId : m.chat, text, m, options)
    m.replys = (text, chatId, options) => viper.replys(chatId ? chatId : m.chat, text, m, options)
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => viper.copyNForward(jid, m, forceForward, options)
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => viper.cMod(jid, m, text, sender, options)
    m.delete = () => viper.sendMessage(m.chat, { delete: m.key })
    try {
    viper.saveName(m.sender, m.name)
    viper.pushMessage(m)
    if (m.isGroup) viper.saveName(m.chat)
    if (m.msg && m.mtype == 'protocolMessage') viper.ev.emit('message.delete', m.msg.key)
    } catch (e) {
    console.error(e)
    }
    return m
}

exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

exports.protoType = () => {
    Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
    const ab = new ArrayBuffer(this.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < this.length; ++i) {
    view[i] = this[i];
    }
    return ab;
}

Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
    return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
}

ArrayBuffer.prototype.toBuffer = function toBuffer() {
    return Buffer.from(new Uint8Array(this))
}

Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
    return await fileTypeFromBuffer(this)
}

String.prototype.isNumber = Number.prototype.isNumber = isNumber

String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length)
}

String.prototype.capitalizeV2 = function capitalizeV2() {
    const str = this.split(' ')
    return str.map(v => v.capitalize()).join(' ')
}

String.prototype.decodeJid = function decodeJid() {
    if (/:\d+@/gi.test(this)) {
    const decode = jidDecode(this) || {}
    return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
    } else return this.trim()
}

Number.prototype.toTimeString = function toTimeString() {
    const seconds = Math.floor((this / 1000) % 60)
    const minutes = Math.floor((this / (60 * 1000)) % 60)
    const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
    const days = Math.floor((this / (24 * 60 * 60 * 1000)))
    return (
    (days ? `${days} day(s) ` : '') +
    (hours ? `${hours} hour(s) ` : '') +
    (minutes ? `${minutes} minute(s) ` : '') +
    (seconds ? `${seconds} second(s)` : '')
    ).trim()
    }
    Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}

function isNumber() {
    const int = parseInt(this)
    return typeof int === 'number' && !isNaN(int)
}

function getRandom() {
    if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
    return Math.floor(Math.random() * this)
}

function nullish(args) {
    return !(args !== null && args !== undefined)
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})