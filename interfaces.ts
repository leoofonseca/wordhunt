import { DirectionsEnum, OrientationsEnum } from "./enums";

export interface IConfigOptions {
    enableReverseOrder: boolean;
    enableDiagonals: boolean;
}

export interface IDimensions {
    height: number;
    width: number;
}

export interface ICreateGame {
    dimensions: IDimensions;
    options: IConfigOptions;
    words: string[];
}

export interface IVector {
    direction: DirectionsEnum
    orientation: OrientationsEnum;
}