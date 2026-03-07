import sender from '../commands/sender.js';

async function block(client, message) {

    try {

        let target;

        if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {

            target = message.message.extendedTextMessage.contextInfo.participant;

        } else {

            const messageBody =
                message.message?.extendedTextMessage?.text ||
                message.message?.conversation ||
                '';

            const commandsAndArgs = messageBody.slice(1).trim();

            const args = commandsAndArgs.split(/\s+/).slice(1);

            if (!args[0]) {
                sender(message, client, '> _veuillez spécifier un numéro_');
                return;
            }

            target = args[0] + '@s.whatsapp.net';
        }

        await client.updateBlockStatus(target, 'block');

        console.log('contact blocked successfully');

    } catch (e) {

        console.log('erreur:', e);
        sender(message, client, `error: ${e}`);

    }
}

async function unblock(client, message) {

    try {

        let target;

        if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {

            target = message.message.extendedTextMessage.contextInfo.participant;

        } else {

            const messageBody =
                message.message?.extendedTextMessage?.text ||
                message.message?.conversation ||
                '';

            const commandsAndArgs = messageBody.slice(1).trim();

            const args = commandsAndArgs.split(/\s+/).slice(1);

            if (!args[0]) {
                sender(message, client, '> _veuillez spécifier un numéro_');
                return;
            }

            target = args[0] + '@s.whatsapp.net';
        }

        await client.updateBlockStatus(target, 'unblock');

        console.log('contact unblocked successfully');

    } catch (e) {

        console.log('erreur:', e);
        sender(message, client, `error: ${e}`);

    }
}

export default { block, unblock };