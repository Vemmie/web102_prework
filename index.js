/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(const game of games) {
        // create a new div element, which will become the game card
        // add the class game-card to the list

        //"name": "Heroes Of Mythic Americas",
        //"description": "An exciting 5e RPG supplement that heroically represents pre-Columbian American cultures and mythologies",
        //"pledged": 1572,
        //"goal": 10000,
        //"backers": 9,
        //"img": "./assets/heroes_of_mythic_americas.png"

        const gameCard = `<div class="game-card">
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p><strong>Description: </strong>${game.description}</p>
            <p><strong>Backers: </strong>${game.backers.toLocaleString()}</p>
            <p><strong>Pledged: </strong>$${game.pledged.toLocaleString()}</p>
            <p><strong>Goal: </strong>$${game.goal.toLocaleString()}</p>
        </div>`;

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        // append the game to the games-container
        gamesContainer.innerHTML += gameCard;
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc += game.backers
}, 0);

contributionsCard.innerHTML = `<p>${totalContributions.toLocaleString()}</p>`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc += game.pledged
}, 0)

raisedCard.innerHTML = `<p>${totalRaised.toLocaleString()}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalNumberOfGames = GAMES_JSON.reduce((acc, game) => {
    return acc += 1;
}, 0);

gamesCard.innerHTML = `<p>${totalNumberOfGames.toLocaleString()}</p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let UnfundedOnly = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(UnfundedOnly)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let FundedOnly = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(FundedOnly);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfundedGames = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? ++count : count;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const explainString = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalNumberOfGames.toLocaleString()} games. Currently, ${numOfUnfundedGames.toLocaleString()} ${numOfUnfundedGames == 1 ? "game" : "games"} 
                      ${numOfUnfundedGames == 1 ? "remains" : "remain"} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.innerHTML += `<p>${explainString}</p>`;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...rest] = sortedGames;
const { name: topName } = topGame;
const { name: secondName } = secondGame;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("h3");
topGameElement.textContent = `Top Funded Game: ${topName}`;
firstGameContainer.appendChild(topGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("h3");
secondGameElement.textContent = `Runner-Up: ${secondName}`;
secondGameContainer.appendChild(secondGameElement);