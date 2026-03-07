import fs from 'fs'
import path from 'path'

// chemin pour la configuration

console.log('initialisation du chemin de configuration')
const configPath = 'config.json'
const premiumPath = "db.json"

// charger la configuration au démarrage

let config = {}

if (fs.existsSync(configPath)){
    console.log('fichier de configuration trouvé... tentative de lecture...')
    try {

        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        console.log('fichier de configuration lu avec succès !')

    } catch (e){

        console.log('erreur lors de la lecture du fichier config... vérifiez config.json.')

        config = { users: {}}
    } 

} else {

    console.log('fichier de configuration introuvable...')

    config = { users: {}}

}

// sauvegarde automatique

const saveConfig = () => {
    console.log('sauvegarde de la configuration dans le fichier...')
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log('configuration sauvegardée avec succès.')
}


// gestion des utilisateurs premium

let premiums = {}

if (fs.existsSync(premiumPath)){
    try {

        premiums = JSON.parse(fs.readFileSync(premiumPath, 'utf-8'))
        console.log('utilisateurs premium chargés avec succès !')

    } catch (e){

        console.log('erreur lors de la lecture du fichier... vérifiez config.json.')

        premiums = { premiumUser : {}}
    } 

} else {

    premiums = { premiumUser: {}}
    console.log('PSF introuvable')

}

const savePremium = () => {

console.log('...sauvegarde premium...')
fs.writeFileSync(premiumPath, JSON.stringify(premiums, null, 2))
console.log('utilisateurs premium sauvegardés avec succès')

}

export default {

    config,
    premiums,

    saveP(){
        savePremium()
    },

    save(){
        saveConfig()
    }

}