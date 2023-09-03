export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string
      MONGO_URI: string
      ENV: 'dev' | 'prod'
    }
  }
}
