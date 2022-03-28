import { Telegraf, Markup, Telegram } from 'telegraf';
import dayjs from 'dayjs';
import schedule from "node-schedule";
import 'dotenv/config'

let rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/Samara';
rule.second = 0;
rule.minute = 0;
rule.hour = 10;
rule.dayOfWeek = [2, 3]


const bot = new Telegraf(process.env.BOT_TOKEN);
const dayOfWeek = dayjs().format('dddd')

schedule.scheduleJob(rule, function () { // отложенная рассылка сообщений
    bot.telegram.sendMessage(process.env.FAMILY_GROUP_ID, `Hello, today is ${dayOfWeek}`)
    bot.telegram.sendPoll(process.env.FAMILY_GROUP_ID, 'are you going on fotball?', ['yes', 'no'], { is_anonymous: false })
})

bot.start((ctx) => {
    console.log(ctx.update.message) // информация о id группового чата
})

bot.launch()