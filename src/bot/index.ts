import { Context, Telegraf, session } from 'telegraf';
import { Update } from '@telegraf/types';
import config from '../config';
import { logError, logInfo } from '../config/logger';
import { userService } from '../database/users';

interface SessionData {
  userId?: string;
  createdProjectType?: string;
  createdProjectPrompt?: string;
  lastCommand?: string;
}

export interface BotContext extends Context {
  session: SessionData;
  user?: Awaited<ReturnType<typeof userService.getUserByTelegramId>>;
}

let bot: Telegraf<BotContext>;

export const initBot = (): Telegraf<BotContext> => {
  try {
    bot = new Telegraf<BotContext>(config.botToken);

    // Session middleware
    bot.use(
      session({
        defaultSession: (): SessionData => ({}),
      })
    );

    // Auth middleware - load or create user
    bot.use(async (ctx, next) => {
      const telegramId = ctx.from?.id;

      if (telegramId) {
        try {
          let user = await userService.getUserByTelegramId(telegramId);

          if (!user) {
            user = await userService.createUser(telegramId, ctx.from?.username);
          }

          ctx.user = user;

          if (user.is_banned) {
            await ctx.reply('⛔ You have been banned from using this bot.');
            return;
          }
        } catch (error) {
          logError(error, `Auth middleware failed for user ${telegramId}`);
        }
      }

      return next();
    });

    // Error handler
    bot.catch((err, ctx) => {
      logError(err, `Bot error for user ${ctx.from?.id}`);
      ctx.reply('❌ An error occurred. Please try again.').catch(() => {});
    });

    logInfo('Bot initialized successfully');
    return bot;
  } catch (error) {
    logError(error, 'Bot initialization failed');
    throw error;
  }
};

export const getBot = (): Telegraf<BotContext> => {
  if (!bot) {
    initBot();
  }
  return bot;
};

export const startBot = async () => {
  try {
    const botInstance = getBot();

    if (config.botWebhookUrl) {
      logInfo('Starting bot with webhook', { url: config.botWebhookUrl });
      await botInstance.telegram.setWebhook(config.botWebhookUrl);
    } else {
      logInfo('Starting bot with polling');
      await botInstance.launch();
    }
  } catch (error) {
    logError(error, 'Failed to start bot');
    throw error;
  }
};

export const stopBot = async () => {
  try {
    if (bot) {
      await bot.stop('SIGTERM');
      logInfo('Bot stopped gracefully');
    }
  } catch (error) {
    logError(error, 'Failed to stop bot');
  }
};
