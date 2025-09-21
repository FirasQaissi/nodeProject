const data = require('./initialData.json');
const normalizeUser = require('../users/helpers/normalizeUser');
const normalizCard = require('../cards/helpers/normalizeCard');
const {createUser} = require("../users/models/userAccessDataService")
const {create} = require("../cards/models/cardAccessDataService");
const {generateUserPassword} = require("../users/helpers/bcrypt");
const chalk = require("chalk");
const normalizeCard = require('../cards/helpers/normalizeCard');
const Card = require('../cards/models/cardAccessDataService');


const generateInitialCards = async () => {
    const {cards} = data
    cards.forEach(async (card)=>{
try {
    const userId = "6376274068d78742d84f31d2"
    const card= await normalizeCard(card, userId);
    await create(card)
} catch (error) {
    return console.log(chalk.red("Error on generateInitialCards: ", error.message))
}
    })
}

const generateInitialUsers = async () => {
    const {users} = data 
    users.forEach(async (user)=>{
        try {
             user = await normalizeUser(user)
             user.password = generateUserPassword(user.password);
            await createUser(user)
            return;
        } catch (error) {
            return console.log(chalk.red("Error on generateInitialUsers: ", error.message))
        }
    })
}

module.exports = {generateInitialCards, generateInitialUsers};