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
    });

});