import { SpeakTime } from "./speakTime";

export class GameSetup {
    gameTime: number;
    setupTime: number;
    intervalTime: number;
    endMessage: string;
    startCountDown: number;
    speakTimeList: SpeakTime[];
}