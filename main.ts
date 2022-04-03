const instaTouch = require("instatouch"); //https://www.npmjs.com/package/instatouch
require("dotenv").config(); //https://www.npmjs.com/package/dotenv
const fs = require("fs"); //http://nodejs.org/api/fs.html

/*
  THIS IS FUNCTION HAS THE RESPONSABILITY TO WRITE THE CONTENT OF THE GOLDEN TICKET
*/
const getAllParticipants = async () => {
  try {
    //config obj used as the second argument to the lib method '.comments'
    const options = {
      count: 100,
      session: process.env.INSTAGRAM_SESSION_ID,
    };
    //the first argument is the end of the url you want to search for
    const comments = await instaTouch.comments("CbvqwwkLe7B", options);
    return comments.collector;
    // console.log(comments);
  } catch (error) {
    console.log(error);
  }
};

/*
  THIS IS FUNCTION HAS THE RESPONSABILITY TO PICK THE WINNER FROM THE ARRAY OF PARTICIPANTS
  ? @param {array} participants - array of objects with participants info
  ? @returns {object} - info about the winner and golden ticket number
*/
const pickWinner = (participants: Array<{}>): object => {
  const allParticipants = participants.length;
  const pickedComment = Math.floor(Math.random() * allParticipants);
  const pickedWinner = participants[pickedComment];
  return pickedWinner;
};

/*
  THIS IS FUNCTION HAS THE RESPONSABILITY TO SAVE THE DATA FROM THE RAFFLE IN A JSON FILE
*/
const writeWinner = (winner: object) => {
  fs.writeFile("winnerTsTicket.json", JSON.stringify(winner, null, 2), (err: Error) => console.log(err));
};

/*
  MAIN FUNCTION
*/
const main = async () => {
  const participants = await getAllParticipants();
  const pickedWinner: object = pickWinner(participants);
  writeWinner(pickedWinner);
};

main();
