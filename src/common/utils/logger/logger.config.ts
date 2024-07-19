import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import * as winstonDaily from "winston-daily-rotate-file";

const winstonFormat = winston.format;

const dailyOptions = (
  level: string,
  dirname: string = `${process.cwd()}/../logs`,
) => {
  return {
    level,
    dirname,
    filename: `%DATE%.${level}.log`,
    maxsize: 100 * 1024 * 1024,
    maxFiles: 14,
    format: winstonFormat.combine(
      winstonFormat.errors({ stack: true }),
      winstonFormat.uncolorize(),
      winstonFormat.printf((info) => {
        if (info.stack) {
          return `${info.label} ${info.timestamp} ${info.level} : ${info.message} ${info.stack} \n Error: ${info.response?.data.error} \n Error_description: ${info.response?.data.error_description}\n Error_error_code: ${info.response?.data.error_code}`;
        }

        return `${info.timestamp} ${info.level} : ${info.message}`;
      }),
    ),
  };
};

export const winstonLogger = WinstonModule.createLogger({
  level: "info",
  format: winstonFormat.combine(
    winstonFormat.errors({ stack: true }),
    winstonFormat.colorize({ level: true }),
    winstonFormat.prettyPrint(),
    winstonFormat.label({ label: "[ModernWorld]" }),
    winstonFormat.timestamp({ format: "| YYYY-MM-DD HH:mm:ss |" }),
    winstonFormat.printf((info) => {
      if (info.stack) {
        return `${info.label} ${info.timestamp} ${info.level} : ${info.message} ${info.stack} \n Error: ${info.response?.data.error} \n Error_description: ${info.response?.data.error_description}\n Error_error_code: ${info.response?.data.error_code}`;
      }

      return `${info.timestamp} ${info.level} : ${info.message}`;
    }),
  ),

  transports: [
    new winston.transports.Console(),
    //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
    new winstonDaily(dailyOptions("info")),
    //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
    new winstonDaily(dailyOptions("error", `${process.cwd()}/../logs/errors`)),
  ],
});
