interface Config {
    API_URL: string;
    API_KEY: string;
    PAGINATION: number;
    APP_NAME: string;
}

/**
 * The API URL and key default values are for demonstration purposes only.
 * In a production environment, these should be stored securely, such as in Docker secrets
 * or a cloud service, and accessed through the CI/CD pipeline.
 * For now, they are used only for testing purposes.
 */
const config: Config = {
    API_URL: import.meta.env.VITE_PEXELS_API_URL || "https://api.pexels.com/v1",
    API_KEY: import.meta.env.VITE_PEXELS_API_KEY || "eT33h3iFnc6vkZpx32C4LYtPz4yolrc96PLK471F5fVC3phYxStc31y7",
    PAGINATION: import.meta.env.VITE_PAGINATION_COUNT || 20,
    APP_NAME: import.meta.env.VITE_APP_NAME || "Masonry"
}

export default config;