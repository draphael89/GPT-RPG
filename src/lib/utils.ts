import chalk from 'chalk';

export const smartLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(chalk.blue(`[${new Date().toISOString()}] ${message}`));
    if (data) {
      console.log(chalk.cyan(JSON.stringify(data, null, 2)));
    }
  }
};