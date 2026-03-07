import stylizedChar from "../utils/fancy.js"

export async function pingTest(client, message) {
    const remoteJid = message.key.remoteJid
    const start = Date.now()

    await client.sendMessage(remoteJid, { text: "📡 Pinging..." }, { quoted: message })

    const latency = Date.now() - start

    await client.sendMessage(remoteJid, {
        text: stylizedChar(
            `🚀 SOCIETY-MD Network\n\n` +
            `Latency: ${latency} ms\n\n` +
            `[𒆜𝐁𝐑𝐀𝐃 𝐒𝐎𝐂𝐈𝐄𝐓𝐘𒆜]`
        )
    }, { quoted: message })
}