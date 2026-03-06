export async function uptime(client, message) {
    const remoteJid = message.key.remoteJid
    const uptime = process.uptime()
    
    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = Math.floor(uptime % 60)
    
    const text = `┌─🤖 [𒆜𝐁𝐑𝐀𝐃 𝐒𝐎𝐂𝐈𝐄𝐓𝐘𒆜] 243 ─┐
│
│ ⏱️ Uptime: ${days}d ${hours}h ${minutes}m
│ 💾 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB
│
│ "Beyond limits, we rise."
│     - DC243 -
└────────────────────┘`
    
    await client.sendMessage(remoteJid, { text: text })
}

export default uptime