import { Telegraf, Markup, Telegram } from 'telegraf';
import dayjs from 'dayjs';
import schedule from "node-schedule";
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN)

schedule.scheduleJob('25 * * * *', function () { // отложенная рассылка сообщений
    console.log('333')
    bot.telegram.sendMessage(process.env.FAMILY_GROUP_ID, 'Hello everyone')
    bot.telegram.sendPoll(process.env.FAMILY_GROUP_ID, 'test poll', ['1', '2'], { is_anonymous: false })
})

bot.start((ctx) => {
    console.log('here');
})

bot.launch()