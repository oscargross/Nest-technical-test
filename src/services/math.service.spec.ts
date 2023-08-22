import { Test, TestingModule } from '@nestjs/testing';
import { MathService } from './math.service';

describe('MathService', () => {
    let mathService: MathService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MathService],
        }).compile();

        mathService = module.get<MathService>(MathService);
    });

    it('should correctly add two positive integers', () => {
        const result = mathService.add(2, 3);
        expect(result).toBe(5);
    });

    it('should correctly add two negative integers', () => {
        const result = mathService.add(-2, -3);
        expect(result).toBe(-5);
    });

    it('should return zero when adding zero to zero', () => {
        const result = mathService.add(0, 0);
        expect(result).toBe(0);
    });
});
