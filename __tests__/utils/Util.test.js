import util from '../../src/utils/Util';

describe('Util', () => {
    describe('getRandomInt', () => {
        it('should return a number within the specified range', () => {
            const min = 10;
            const max = 20;
            const result = util.getRandomInt(min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThan(max);
        });

        it('should return an integer', () => {
            const result = util.getRandomInt(1, 100);
            expect(Number.isInteger(result)).toBe(true);
        });

        it('should handle large ranges', () => {
            const result = util.getRandomInt(1000, 100000);
            expect(result).toBeGreaterThanOrEqual(1000);
            expect(result).toBeLessThan(100000);
        });
    });

    describe('round10', () => {
        it('should round up to the nearest multiple of 10', () => {
            expect(util.round10(5)).toBe(10);
            expect(util.round10(11)).toBe(20);
            expect(util.round10(25)).toBe(30);
            expect(util.round10(99)).toBe(100);
        });

        it('should return the same number if already a multiple of 10', () => {
            expect(util.round10(10)).toBe(10);
            expect(util.round10(50)).toBe(50);
            expect(util.round10(100)).toBe(100);
        });

        it('should handle zero', () => {
            expect(util.round10(0)).toBe(0);
        });
    });

    describe('getNumberRandomRound10', () => {
        it('should return a number between 1000 and 100000', () => {
            const result = util.getNumberRandomRound10();
            expect(result).toBeGreaterThanOrEqual(1000);
            expect(result).toBeLessThan(100000);
        });

        it('should return a multiple of 10', () => {
            const result = util.getNumberRandomRound10();
            expect(result % 10).toBe(0);
        });

        it('should generate different values', () => {
            const results = new Set();
            for (let i = 0; i < 10; i++) {
                results.add(util.getNumberRandomRound10());
            }
            // Should have at least 5 different values
            expect(results.size).toBeGreaterThanOrEqual(5);
        });
    });

    describe('hasValue', () => {
        it('should return true for numbers', () => {
            expect(util.hasValue(0)).toBe(true);
            expect(util.hasValue(123)).toBe(true);
            expect(util.hasValue(-5)).toBe(true);
        });

        it('should return true for non-empty strings', () => {
            expect(util.hasValue('hello')).toBe(true);
            expect(util.hasValue('a')).toBe(true);
        });

        it('should return false for undefined', () => {
            expect(util.hasValue(undefined)).toBe(false);
        });

        it('should return false for null', () => {
            expect(util.hasValue(null)).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(util.hasValue('')).toBe(false);
        });

        it('should return true for objects and arrays', () => {
            expect(util.hasValue({})).toBe(true);
            expect(util.hasValue([])).toBe(true);
        });
    });

    describe('calculateCartTotal', () => {
        it('should calculate the total price correctly', () => {
            const cart = [
                { price: 1000, quantity: 2 },
                { price: 1500, quantity: 1 },
                { price: 2000, quantity: 3 },
            ];

            const total = util.calculateCartTotal(cart);
            expect(total).toBe(9500); // (1000*2) + (1500*1) + (2000*3)
        });

        it('should return 0 for empty cart', () => {
            expect(util.calculateCartTotal([])).toBe(0);
        });

        it('should ignore items with quantity 0', () => {
            const cart = [
                { price: 1000, quantity: 2 },
                { price: 1500, quantity: 0 },
            ];

            const total = util.calculateCartTotal(cart);
            expect(total).toBe(2000);
        });
    });

    describe('calculateCartItemCount', () => {
        it('should calculate the total item count correctly', () => {
            const cart = [
                { quantity: 2 },
                { quantity: 1 },
                { quantity: 3 },
            ];

            const count = util.calculateCartItemCount(cart);
            expect(count).toBe(6);
        });

        it('should return 0 for empty cart', () => {
            expect(util.calculateCartItemCount([])).toBe(0);
        });

        it('should handle items with quantity 0', () => {
            const cart = [
                { quantity: 2 },
                { quantity: 0 },
                { quantity: 3 },
            ];

            const count = util.calculateCartItemCount(cart);
            expect(count).toBe(5);
        });
    });
});