import { SpeakTime } from "./speakTime";

export class GameSetup {
    gameTime: number = 0;
    setupTime: number= 0;
    intervalTime: number;
    endMessage: string;
    startCountDown: number;
    speakTimeList: SpeakTime[] = [];
}