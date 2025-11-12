import { ExecuteMsg } from "./messageExecute";

const input = process.argv.slice(2).join(" ");

ExecuteMsg(input);