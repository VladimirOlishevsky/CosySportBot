import { Telegraf } from 'telegraf';
import schedule from "node-schedule";
import 'dotenv/config';

let rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/Samara';
rule.second = 0;
rule.minute = 0;
rule.hour = 10;
rule.dayOfWeek = [2, 3];


const bot = new Telegraf(process.env.COSY_SPORT_BOT_TOKEN);

schedule.scheduleJob(rule, function () { // отложенная рассылка сообщений
    bot.telegram.sendPoll(process.env.FAMILY_GROUP_ID, 'Футбол', ['+', '-', '+-', '+1', '+2', '+3'], { is_anonymous: false })
});

bot.start((ctx) => {
    ctx.reply(
        `Hi ${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}! \n` + 
        '\n' +
        'Этот бот присылает спортивные опросы к назначенному времени \n' + 
        'По вопросам - @vladimir_olishevsky'
    );
});

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
        '\n' +
        'Этот бот присылает спортивные опросы к назначенному времени \n' + 
        'По вопросам - @vladimir_olishevsky'
    );
});

bot.command('getId', (ctx) => {
    console.log('chatId', ctx.update.message.chat.id) // информация о id группового чата
    // console.log('userId', ctx.update.message.chat.id) // информация о id того, кто отправил сообщение
});

bot.launch();