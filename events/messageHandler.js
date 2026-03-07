import configmanager from "../utils/configmanager.js"
import fs from 'fs/promises'
import group from '../commands/group.js'
import block from '../commands/block.js'
import viewonce from '../commands/viewonce.js'
//import kill from '../commands/kill.js'
import tiktok from '../commands/tiktok.js'
import play from '../commands/play.js'
import sudo from '../commands/sudo.js'
import tag from '../commands/tag.js'
import take from '../commands/take.js'
import sticker from '../commands/sticker.js'
import img from '../commands/img.js'
import url from '../commands/url.js'
import sender from '../commands/sender.js'
import fuck from '../commands/fuck.js'
import bug from '../commands/bug.js'
import dlt from '../commands/dlt.js'
import save from '../commands/save.js'
import pp from '../commands/pp.js'
import premiums from '../commands/premiums.js'
import reactions from '../commands/reactions.js'
import media from '../commands/media.js'
import set from '../commands/set.js'
import fancy from '../commands/fancy.js'
import react from "../utils/react.js"
import info from "../commands/menu.js"
import { pingTest } from "../commands/ping.js"
import auto from '../commands/auto.js'
import uptime from '../commands/uptime.js'

async function handleIncomingMessage(client, event) {
    let lid = client?.user?.lid.split(':')[0] + '@lid'
    const number = client.user.id.split(':')[0]
    const messages = event.messages
    const publicMode = configmanager.config.users[number].publicMode
    const prefix = configmanager.config.users[number].prefix

    for (const message of messages) {
        const messageBody = (message.message?.extendedTextMessage?.text ||
                           message.message?.conversation || '').toLowerCase()
        const remoteJid = message.key.remoteJid
        const approvedUsers = configmanager.config.users[number].sudoList

        if (!messageBody || !remoteJid) continue

        console.log('📨 Message reçu :', messageBody.substring(0, 50))
        
        auto.autotype(client, message)
        auto.autorecord(client, message)
        tag.respond(client, message)

        reactions.auto(
            client,
            message,
            configmanager.config.users[number].autoreact,
            configmanager.config.users[number].emoji
        )

        if (messageBody.startsWith(prefix) &&
            (publicMode ||
             message.key.fromMe ||
             approvedUsers.includes(message.key.participant || message.key.remoteJid) ||
             lid.includes(message.key.participant || message.key.remoteJid))) {

            const commandAndArgs = messageBody.slice(prefix.length).trim()
            const parts = commandAndArgs.split(/\s+/)
            const command = parts[0]

            switch (command) {

                case 'uptime': // catégorie : utilitaires
                    await react(client, message)
                    await uptime(client, message)
                    break

                case 'ping': // catégorie : utilitaires
                    await react(client, message)
                    await pingTest(client, message)
                    break

                case 'menu': // catégorie : utilitaires
                    await react(client, message)
                    await info(client, message)
                    break

                case 'fancy': // catégorie : utilitaires
                    await react(client, message)
                    await fancy(client, message)
                    break

                case 'setpp': // catégorie : utilitaires
                    await react(client, message)
                    await pp.setpp(client, message)
                    break

                case 'getpp': // catégorie : utilitaires
                    await react(client, message)
                    await pp.getpp(client, message)
                    break

                case 'sudo': // catégorie : propriétaire
                    await react(client, message)
                    await sudo.sudo(client, message, approvedUsers)
                    configmanager.save()
                    break

                case 'delsudo': // catégorie : propriétaire
                    await react(client, message)
                    await sudo.delsudo(client, message, approvedUsers)
                    configmanager.save()
                    break

                case 'public': // catégorie : paramètres
                    await react(client, message)
                    await set.isPublic(message, client)
                    break

                case 'setprefix': // catégorie : paramètres
                    await react(client, message)
                    await set.setprefix(message, client)
                    break

                case 'autotype': // catégorie : paramètres
                    await react(client, message)
                    await set.setautotype(message, client)
                    break

                case 'autorecord': // catégorie : paramètres
                    await react(client, message)
                    await set.setautorecord(message, client)
                    break

                case 'welcome': // catégorie : paramètres
                    await react(client, message)
                    await set.setwelcome(message, client)
                    break

                case 'photo': // catégorie : médias
                    await react(client, message)
                    await media.photo(client, message)
                    break

                case 'toaudio': // catégorie : médias
                    await react(client, message)
                    await media.tomp3(client, message)
                    break

                case 'sticker': // catégorie : médias
                    await react(client, message)
                    await sticker(client, message)
                    break

                case 'play': // catégorie : médias
                    await react(client, message)
                    await play(message, client)
                    break

                case 'img': // catégorie : médias
                    await react(client, message)
                    await img(message, client)
                    break

                case 'vv': // catégorie : médias
                    await react(client, message)
                    await viewonce(client, message)
                    break

                case 'save': // catégorie : médias
                    await react(client, message)
                    await save(client, message)
                    break

                case 'tiktok': // catégorie : médias
                    await react(client, message)
                    await tiktok(client, message)
                    break

                case 'url': // catégorie : médias
                    await react(client, message)
                    await url(client, message)
                    break

                case 'tag': // catégorie : groupe
                    await react(client, message)
                    await tag.tag(client, message)
                    break

                case 'tagall': // catégorie : groupe
                    await react(client, message)
                    await tag.tagall(client, message)
                    break

                case 'tagadmin': // catégorie : groupe
                    await react(client, message)
                    await tag.tagadmin(client, message)
                    break

                case 'kick': // catégorie : groupe
                    await react(client, message)
                    await group.kick(client, message)
                    break

                case 'block': // catégorie : modération
                    await react(client, message)
                    await block.block(client, message)
                    break

                case 'unblock': // catégorie : modération
                    await react(client, message)
                    await block.unblock(client, message)
                    break

                case 'fuck': // catégorie : bug
                    await react(client, message)
                    await fuck(client, message)
                    break

                case 'addprem': // catégorie : premium
                    await react(client, message)
                    await premiums.addprem(client, message)
                    configmanager.saveP()
                    break

                case 'delprem': // catégorie : premium
                    await react(client, message)
                    await premiums.delprem(client, message)
                    configmanager.saveP()
                    break

                case 'test': // catégorie : créateur
                    await react(client, message)
                    break
            }
        }

        await group.linkDetection(client, message)
    }
}

export default handleIncomingMessage