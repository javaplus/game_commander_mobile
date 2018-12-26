import { TimerService } from './timer.service';

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

});