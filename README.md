## Advent of Code 2024
My solutions to AoC24 in typescript

### Project Structure
Each days solutions are contained within the `day/{dayNumber}.ts` file. Part 1 and 2 are defined as const within this file.

The input for this is defined within `input/{dayNumber}.txt` file. The files within the repo are for my github account.

Some util functions (such as generating permutations and sorting arrays) are contained within `util.ts`

The `main.ts` file is called from the command line to run both parts for each day

### Running the code

#### NPM Install

Run `npm i` from the root of the project to install necessary packages eg typescript

#### Getting the input file
The code will default to using the input file saved within `input/{dayNumber}.txt`. If it is not found, it will attempt to download and save from the AoC API.

To run your own input file, paste the relevant day into the file with the correct name.

Alternatively, retrieve your session cookie (by inspecting the requests made by your browser in the Network tab of dev tools) and place it into a `session.txt` file at the root of the project (not within `src/`). Only include the HexString and not the `session=` part. If the code errors after doing this, check to see if there is an extra newline at the end of the file.

#### Running the code

The code is run from `main.ts`. Change the import and value passed to the readfile const within this file.

Compile the code with `tsc src/main.ts`. This will generate the compiled javascript files for the entire codebase.

Run the code with `node main.js`. This will run the compiled javascript code and print the output for both part 1 and 2.





