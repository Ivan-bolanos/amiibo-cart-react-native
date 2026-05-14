import amiiboApi from '../../src/services/amiiboApi';

global.fetch = jest.fn();

describe('AmiiboApiService', () => {
    beforeEach(() => {
        fetch.mockClear();
        jest.clearAllTimers();
        jest.useFakeTimers();
    });

    afterEach(() => {
        if (jest.isMockFunction(setTimeout)) {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        }
    });

    describe('getZeldaAmiibos', () => {
        it('should return success with data on successful API call', async () => {
            const mockResponse = {
                amiibo: [
                    {
                        name: 'Link',
                        character: 'Link',
                        gameSeries: 'The Legend of Zelda',
                        image: 'https://example.com/link.png',
                    },
                ],
            };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await amiiboApi.getZeldaAmiibos();

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockResponse.amiibo);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('amiibo/?gameseries=The Legend of Zelda'),
                expect.objectContaining({
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            );
        });

        it('should return error on HTTP error', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            });

            const result = await amiiboApi.getZeldaAmiibos();

            expect(result.success).toBe(false);
            expect(result.error).toContain('404');
            expect(result.error).toContain('Not Found');
        });

        it('should return error on invalid response format', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ invalid: 'data' }),
            });

            const result = await amiiboApi.getZeldaAmiibos();

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid response format');
        });

        it('should handle network errors', async () => {
            fetch.mockRejectedValueOnce(new Error('Network request failed'));

            const result = await amiiboApi.getZeldaAmiibos();

            expect(result.success).toBe(false);
            expect(result.error).toContain('Network error');
        });

        it('should handle timeout', async () => {
            const abortError = new Error('Aborted');
            abortError.name = 'AbortError';

            fetch.mockImplementationOnce(() => Promise.reject(abortError));

            const result = await amiiboApi.getZeldaAmiibos();

            expect(result.success).toBe(false);
            expect(result.error).toContain('timeout');
        });

        it('should return error when amiibo array is missing', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            });

            const result = await amiiboApi.getZeldaAmiibos();

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid response format');
        });

        it('should return error when amiibo is not an array', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ amiibo: 'not an array' }),
            });

            const result = await amiiboApi.getZeldaAmiibos();

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid response format');
        });
    });
});