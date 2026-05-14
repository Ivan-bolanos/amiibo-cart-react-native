const API_CONFIG = {
    BASE_URL: 'https://www.amiiboapi.com/api',
    TIMEOUT: 10000,
    ENDPOINTS: {
        ZELDA_AMIIBOS: '/amiibo/?gameseries=The Legend of Zelda',
    },
};

class AmiiboApiService {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    async fetchWithTimeout(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    async getZeldaAmiibos() {
        try {
            const url = `${this.baseURL}${API_CONFIG.ENDPOINTS.ZELDA_AMIIBOS}`;
            const response = await this.fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return {
                    success: false,
                    error: `HTTP Error: ${response.status} ${response.statusText}`,
                };
            }

            const json = await response.json();

            if (!json || !json.amiibo || !Array.isArray(json.amiibo)) {
                return {
                    success: false,
                    error: 'Invalid response format from API',
                };
            }

            return {
                success: true,
                data: json.amiibo,
            };
        } catch (error) {
            if (error.name === 'AbortError') {
                return {
                    success: false,
                    error: 'Request timeout. Please check your connection.',
                };
            }

            if (error.message === 'Network request failed') {
                return {
                    success: false,
                    error: 'Network error. Please check your internet connection.',
                };
            }

            return {
                success: false,
                error: error.message || 'An unexpected error occurred',
            };
        }
    }
}

export default new AmiiboApiService();