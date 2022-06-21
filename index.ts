import { DirectionsEnum, OrientationsEnum } from "./enums";
import { WORDS_BIGGER_THAN_SIZE } from "./errors";
import {
  IConfigOptions,
  ICreateGame,
  IDimensions,
  IVector,
} from "./interfaces";

const DEFAULT_HEIGHT = 10;
const DEFAULT_WIDTH = 10;

const DEFAULT_WORDS = [
  "adoleta",
  "lepeti",
  "petipolá",
  "lecafé",
  "com",
  "chocolá",
];

function initializeMatrix(width: number, height: number): string[][] {
  const matrix: string[][] = [];

  for (let i = 0; i < width; i++) {
    const column: string[] = [];

    for (let j = 0; j < height; j++) {
      column.push(".");
    }

    matrix.push(column);
  }

  return matrix;
}

function determinePossibleWordStartIndexes(
  dimensions: IDimensions,
  options: IConfigOptions,
  wordLength: number
) {
  if (wordLength > dimensions.height || wordLength > dimensions.width) {
    throw new Error(WORDS_BIGGER_THAN_SIZE);
  }

  const possibleIndices: {
    x: number;
    y: number;
    vectors: IVector[];
    possibilities: number;
  }[] = [];

  // First select all valid indices regarding word length only
  for (let i = 0; i < dimensions.width; i++) {
    for (let j = 0; j < dimensions.height; j++) {
      const vectors: IVector[] = [];

      // Try horizontally
      if (wordLength + i <= dimensions.width) {
        vectors.push({
          direction: DirectionsEnum.HORIZONTAL,
          orientation: OrientationsEnum.EAST,
        });
      }

      // Try horizontally and reverse
      if (options.enableReverseOrder && i + 1 >= wordLength) {
        vectors.push({
          direction: DirectionsEnum.HORIZONTAL,
          orientation: OrientationsEnum.WEST,
        });
      }

      // Try vertically
      if (wordLength + j <= dimensions.height) {
        vectors.push({
          direction: DirectionsEnum.VERTICAL,
          orientation: OrientationsEnum.SOUTH,
        });
      }

      // Try vertically and reverse
      if (options.enableReverseOrder && j + 1 >= wordLength) {
        vectors.push({
          direction: DirectionsEnum.VERTICAL,
          orientation: OrientationsEnum.WEST,
        });
      }

      // Diagonals enabled
      if (options.enableDiagonals) {
        // Try through the bisector of even quadrants
        if (
          wordLength + i <= dimensions.width &&
          wordLength + j <= dimensions.height
        ) {
          vectors.push({
            direction: DirectionsEnum.DIAGONAL,
            orientation: OrientationsEnum.SOUTHEAST,
          });
        }

        // Try through the bisector of even quadrants and reverse
        if (
          options.enableReverseOrder &&
          i + 1 >= wordLength &&
          j + 1 >= wordLength
        ) {
          vectors.push({
            direction: DirectionsEnum.DIAGONAL,
            orientation: OrientationsEnum.NORTHWEST,
          });
        }

        // Try through the bisector of odd quadrants
        if (wordLength + i <= dimensions.width && j + 1 >= wordLength) {
          vectors.push({
            direction: DirectionsEnum.DIAGONAL,
            orientation: OrientationsEnum.NORTHEAST,
          });
        }

        // Try through the bisector of odd quadrants and reverse
        if (
          options.enableReverseOrder &&
          i + 1 >= wordLength &&
          wordLength + j <= dimensions.height
        ) {
          vectors.push({
            direction: DirectionsEnum.DIAGONAL,
            orientation: OrientationsEnum.SOUTHEAST,
          });
        }
      }

      if (vectors.length) {
        possibleIndices.push({
          x: i,
          y: j,
          vectors: vectors,
          possibilities: vectors.length,
        });
      }
    }
  }

  return possibleIndices;
}

function createGame(props: ICreateGame) {
  try {
    const { words, dimensions, options } = props;

    // FIXME: handle dimensions optionallity
    if (
      words.some(
        (word) =>
          word.length > dimensions.height || word.length > dimensions.width
      )
    ) {
      throw new Error(WORDS_BIGGER_THAN_SIZE);
    }

    // First word is the smallets, last word is the biggest
    const sortedWords = words.sort((a, b) => a.length - b.length);

    const matrix = initializeMatrix(dimensions.width, dimensions.height);

    do {
      const wordToBePlaced = sortedWords.pop();
    } while (sortedWords.length);
  } catch (error) {
    console.log(error);
    return error;
  }
}

const teste = determinePossibleWordStartIndexes(
  { height: 10, width: 10 },
  { enableDiagonals: true, enableReverseOrder: true },
  5
);

teste.forEach((entry) =>
  console.log(`[${entry.x}][${entry.y}]: ${entry.possibilities} possibilities`)
);
