import { determinePossibleWordStartIndexes } from "./functions";

const teste = determinePossibleWordStartIndexes(
  { height: 10, width: 10 },
  { enableDiagonals: true, enableReverseOrder: true },
  5
);

teste.forEach((entry) =>
  console.log(`[${entry.x}][${entry.y}]: ${entry.possibilities} possibilities`)
);
