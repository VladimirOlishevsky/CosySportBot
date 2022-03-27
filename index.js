import { Telegraf, Markup, Telegram } from 'telegraf';
import dayjs from 'dayjs';
import schedule from "node-schedule";
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN)

schedule.scheduleJob('* 20 * * 0', function () { // отложенная рассылка сообщений
    bot.telegram.sendMessage(process.env.FAMILY_GROUP_ID, 'Hello, you need to go on english classes')
    bot.telegram.sendPoll(process.env.FAMILY_GROUP_ID, 'are you going?', ['yes', 'no'], { is_anonymous: false })
})

bot.start((ctx) => {
    console.log('here');
})

bot.launch()