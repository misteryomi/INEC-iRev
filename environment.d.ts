declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DB_USER: string;
            DB_HOST: string;
            DB_NAME: string;
            DB_PASSWORD: string;
            DB_PORT: number;
            DB_URL: string;
        }
    }
}

export { }
