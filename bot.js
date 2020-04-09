const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
// This file would be created soon
const parser = require('./parser.js');
 
require('dotenv').config();
 
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/word (.+)/, (msg, match) => { // only responses that start with /word
    const chatId = msg.chat.id;
    const word = match[1];
    axios
      .get(`${process.env.OXFORD_API_URL}/entries/en-gb/${word}`, {
        params: {
          fields: 'definitions',
          strictMatch: 'false'
        },
        headers: {
          app_id: process.env.OXFORD_APP_ID,
          app_key: process.env.OXFORD_APP_KEY
        }
      })
      .then(response => {
        const parsedHtml = parser(response.data);
        bot.sendMessage(chatId, parsedHtml, { parse_mode: 'HTML' });
      })
      .catch(error => {
        const errorText = error.response.status === 404 ? `No definition found for the word: <b>${word}</b>` : `<b>An error occured, please try again later</b>`;
        bot.sendMessage(chatId, errorText, { parse_mode:'HTML'})
      });
  });


  bot.onText(/\/word (.+)/, (msg, match) => { // only responses that start with /word
    const chatId = msg.chat.id;
    const word = match[1];
    axios
      .get(`${process.env.OXFORD_API_URL}/entries/en-gb/${word}`, {
        params: {
          fields: 'definitions',
          strictMatch: 'false'
        },
        headers: {
          app_id: process.env.OXFORD_APP_ID,
          app_key: process.env.OXFORD_APP_KEY
        }
      })
      .then(response => {
        const parsedHtml = parser(response.data);
        bot.sendMessage(chatId, parsedHtml, { parse_mode: 'HTML' });
      })
      .catch(error => {
        const errorText = error.response.status === 404 ? `No definition found for the word: <b>${word}</b>` : `<b>An error occured, please try again later</b>`;
        bot.sendMessage(chatId, errorText, { parse_mode:'HTML'})
      });
  });


  bot.onText(/\/sum (.+)/, (msg, match) => { // only responses that start with /word
    const chatId = msg.chat.id;

    const nums = match[0].replace("/sum","").split("+");
     bot.sendMessage(chatId, `${parseInt(nums[0])+parseInt(nums[1])}`, { parse_mode: 'HTML' });
   
    
  });

  bot.on("polling_error", (err) => console.log(err));

