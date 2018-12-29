import { TimerService } from './timer.service';
import { GameSetup } from '../entities/gameSetup';

describe('TimerService', () => {
    let service: TimerService;
    let httpClientSpy;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('TimerService', {
            post: 0
        });
        service = new TimerService(httpClientSpy);
    });

    it('service exists', () => {
        expect(service).toBeTruthy();
    });

    it('when setupGame called with gameTime of 25 and interval of 5, then 5 speakItems are created', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 5;
        gameSetup.gameTime = 25;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.speakItems.length).toBe(5);

    });

    it('when setupGame called with gameTime of 5 and interval of 5, then one speakItems created with say "time remaining 5 minutes"', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 5;
        gameSetup.gameTime = 5;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.speakItems.length).toBe(1);
        expect(gameRequest.speaktime.speakItems[0].say).toBe("5 minutes remaining. 5 minutes.");

    });

    it('when setupGame called with gameTime of 5 and interval of 3, then speakItems created for 5 minutes and 3 minutes', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 5;
        gameSetup.gameTime = 5;
        gameSetup.intervalTime = 3;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.speakItems.length).toBe(2);
        expect(gameRequest.speaktime.speakItems[0].say).toBe("5 minutes remaining. 5 minutes.");
        expect(gameRequest.speaktime.speakItems[1].say).toBe("2 minutes remaining. 2 minutes.");

    });

    
    it('when setupGame called with gameTime of 25 and interval of 5, then speakItems created for 25, 20, 15,10, and 5 minutes', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.speakItems.length).toBe(5);
        expect(gameRequest.speaktime.speakItems[0].say).toBe("25 minutes remaining. 25 minutes.");
        expect(gameRequest.speaktime.speakItems[1].say).toBe("20 minutes remaining. 20 minutes.");
        expect(gameRequest.speaktime.speakItems[2].say).toBe("15 minutes remaining. 15 minutes.");
        expect(gameRequest.speaktime.speakItems[3].say).toBe("10 minutes remaining. 10 minutes.");
        expect(gameRequest.speaktime.speakItems[4].say).toBe("5 minutes remaining. 5 minutes.");

    });

    it('when setupGame called with gameTime of 25 and interval of 5, then speakItems time created for 25, 20, 15,10, and 5 minutes', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.speakItems.length).toBe(5);
        expect(gameRequest.speaktime.speakItems[0].time).toBe(25);
        expect(gameRequest.speaktime.speakItems[1].time).toBe(20);
        expect(gameRequest.speaktime.speakItems[2].time).toBe(15);
        expect(gameRequest.speaktime.speakItems[3].time).toBe(10);
        expect(gameRequest.speaktime.speakItems[4].time).toBe(5)

    });
});