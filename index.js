import { Telegraf, Markup, Telegram } from 'telegraf';
import dayjs from 'dayjs';
import schedule from "node-schedule";
import 'dotenv/config';

let rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/Samara';
rule.second = 0;
rule.minute = 0;
rule.hour = 10;
rule.dayOfWeek = [2, 3];


const bot = new Telegraf(process.env.BOT_TOKEN);
const dayOfWeek = dayjs().format('dddd');

schedule.scheduleJob(rule, function () { // отложенная рассылка сообщений
    bot.telegram.sendMessage(process.env.FAMILY_GROUP_ID, `Hello, today is ${dayOfWeek}`)
    bot.telegram.sendPoll(process.env.FAMILY_GROUP_ID, 'are you going on fotball?', ['yes', 'no'], { is_anonymous: false })
});

bot.start(() => {});
bot.on('new_chat_members', (ctx) => {
    bot.telegram.sendMessage(
        ctx.message.chat.id, 
        `Hi ${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}! \n` + 
        'Этот чат создан для обсуждения спортивных движух CosySoft. \n' + 
        'Каждый вторник играем в футбол в 18:30, так же есть волейбол, баскетбол - дни проведения разные \n' +
        'Можешь предложить свою спортивную активность - здесь только рады. Welcome! \n'
        )
});

bot.help((ctx) => {
    ctx.reply(
        `Hi ${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}! \n` + 
        'По вопросам работы бота @vladimir_olishevsky'
    );
});

bot.command('getId', (ctx) => {
    console.log('chatId', ctx.update.message.chat.id) // информация о id группового чата
    // console.log('userId', ctx.update.message.chat.id) // информация о id того, кто отправил сообщение
});

bot.launch();