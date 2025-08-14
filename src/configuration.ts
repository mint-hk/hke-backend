import { configDotenv } from 'dotenv';

configDotenv();

export type ServerConfiguration = {
  port: number;
  database: DatabaseConfiguration;
  auth: AuthConfiguration;
};

export type DatabaseConfiguration = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
};

export type AuthConfiguration = {
  jwtSecret: string;
  salt: string;
};

const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SYNCHRONIZE, JWT_SECRET, SALT } = process.env;

const requiredEnv = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  SALT,
};

const missingEnv: string[] = [];
for (const key of Object.keys(requiredEnv)) {
  if (!requiredEnv[key]) {
    missingEnv.push(key);
  }
}

if (missingEnv.length > 0) {
  throw new Error('Missing environment values: ' + missingEnv.join(', '));
}

const required = requiredEnv as Record<keyof typeof requiredEnv, string>;

export default function (): ServerConfiguration {
  return {
    port: Number(PORT) || 3000,
    database: {
      host: required.DB_HOST,
      port: Number(DB_PORT) || 5432,
      username: required.DB_USER,
      password: required.DB_PASSWORD,
      database: required.DB_NAME,
      synchronize: DB_SYNCHRONIZE === 'true',
    },
    auth: {
      jwtSecret: required.JWT_SECRET,
      salt: required.SALT,
    },
  };
}
