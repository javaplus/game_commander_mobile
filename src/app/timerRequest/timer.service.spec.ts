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

    it('when setupGame called with gameTime of 25 and interval of 5, then 5 speakTimes are created', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 5;
        gameSetup.gameTime = 25;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.length).toBe(5);

    });

    it('when setupGame called with gameTime of 5 and interval of 5, then one speakTimes created with say "time remaining 5 minutes"', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 5;
        gameSetup.gameTime = 5;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.length).toBe(1);
        expect(gameRequest.speaktime[0].say).toBe("5 minutes remaining. 5 minutes.");

    });

    it('when setupGame called with gameTime of 5 and interval of 3, then speakTimes created for 5 minutes and 3 minutes', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 5;
        gameSetup.gameTime = 5;
        gameSetup.intervalTime = 3;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.length).toBe(2);
        expect(gameRequest.speaktime[0].say).toBe("5 minutes remaining. 5 minutes.");
        expect(gameRequest.speaktime[1].say).toBe("2 minutes remaining. 2 minutes.");

    });

    
    it('when setupGame called with gameTime of 25 and interval of 5, then speakTimes created for 25, 20, 15,10, and 5 minutes', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.length).toBe(5);
        expect(gameRequest.speaktime[0].say).toBe("25 minutes remaining. 25 minutes.");
        expect(gameRequest.speaktime[1].say).toBe("20 minutes remaining. 20 minutes.");
        expect(gameRequest.speaktime[2].say).toBe("15 minutes remaining. 15 minutes.");
        expect(gameRequest.speaktime[3].say).toBe("10 minutes remaining. 10 minutes.");
        expect(gameRequest.speaktime[4].say).toBe("5 minutes remaining. 5 minutes.");

    });

    it('when setupGame called with gameTime of 25 and interval of 5, then speakTimes time created for 25, 20, 15,10, and 5 minutes', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.length).toBe(5);
        expect(gameRequest.speaktime[0].time).toBe('25');
        expect(gameRequest.speaktime[1].time).toBe('20');
        expect(gameRequest.speaktime[2].time).toBe('15');
        expect(gameRequest.speaktime[3].time).toBe('10');
        expect(gameRequest.speaktime[4].time).toBe('5')

    });

    it('when setupGame called with interval, then speakTimes time created use params of -s 140', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        gameSetup.intervalTime = 5;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime.length).toBe(5);
        expect(gameRequest.speaktime[0].parms).toBe('-s 120');
       
    });

    it('when setupGame called with gameTime of 25 and setupTime of 3, then GameRequest has 28 minutes', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.minutes).toBe('28');
        
    });

    it('when GameSetup has end time message, then a speakTime should be created with time of 0', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        gameSetup.endMessage = 'This is the end, my only friend, the end.';
        
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime[0].time).toBe('0:00');
        expect(gameRequest.speaktime[0].say).toBe('This is the end, my only friend, the end.');
        
    });

    it('when GameSetup has startCountDown at 10 and gameTime is 25, then a speakTime should be created that starts 10 seconds gameTime.', ()=>{
        let gameSetup = new GameSetup();
        gameSetup.setupTime = 3;
        gameSetup.gameTime = 25;
        gameSetup.startCountDown = 10;
        
        let gameRequest = service.setupGame(gameSetup);

        expect(gameRequest.speaktime[0].time).toBe('25:10');
        expect(gameRequest.speaktime[0].say).toBe('10, 9, 8, 7, 6, 5, 4, 3, 2, 1.');
        
    });
});