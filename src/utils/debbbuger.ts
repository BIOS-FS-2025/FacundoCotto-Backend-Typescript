import chalk from "chalk";
import { Request, Response } from "express";
import { TokenIndexer } from "morgan";

export const debugMorgan = (
  tokens: TokenIndexer<Request, Response>,
  req: Request,
  res: Response
) => {
  const method = tokens.method(req, res) || "UNKNOWN";
  const url = tokens.url(req, res) || "UNKNOWN";
  const status = tokens.status(req, res);
  const responseTime = tokens["response-time"](req, res) || "0";
  const body = tokens.body(req, res) || "{}";
  const ip = tokens["remote-addr"](req, res) || "unknown";
  const userAgent = tokens["user-agent"](req, res) || "unknown";
  const referrer = tokens.referrer(req, res) || "direct";

  const methodColored = chalk.bold.blue(method);
  const urlColored = chalk.white(url);

  let statusColored;
  const statusCode = status ? parseInt(status, 10) : 0;
  console.log("Status code:", statusCode);
  if (statusCode >= 500) {
    statusColored = chalk.bold.red(status);
  } else if (statusCode >= 400) {
    statusColored = chalk.bold.yellow(status);
  } else if (statusCode >= 300) {
    statusColored = chalk.bold.cyan(status);
  } else {
    statusColored = chalk.bold.green(status);
  }

  const responseTimeColored = chalk.magenta(`${responseTime} ms`);

  let logString = `\n${chalk.bold.yellow(
    "▶"
  )} ${methodColored} ${urlColored} ${statusColored} - ${responseTimeColored}`;
  logString += `\n  ${chalk.cyan("From:")} ${chalk.yellow(ip)}`;
  logString += `\n  ${chalk.cyan("Agent:")} ${chalk.white(userAgent)}`;
  logString += `\n  ${chalk.cyan("Referrer:")} ${chalk.white(referrer)}`;

  if (body !== "{}") {
    logString += `\n  ${chalk.gray("Body:")} ${chalk.gray(body)}`;
  }

  return logString;
};
