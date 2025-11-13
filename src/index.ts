import readline from "readline";
import { ExecuteMsg } from "./messageExecute";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask() {
  rl.question("Enter your message (or type 'exit' to quit): ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    // Run your custom function
    await ExecuteMsg(input);

    // Ask again (loop)
    ask();
  });
}

ask();
