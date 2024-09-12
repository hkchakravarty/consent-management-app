interface Config {
  API_URL: string;
  ITEMS_PER_PAGE: number;
}

declare const __ENV__: {
  VITE_API_URL?: string;
  VITE_ITEMS_PER_PAGE?: string;
};

const getEnvVariable = (key: string, defaultValue: string): string => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  if (typeof __ENV__ !== "undefined" && __ENV__[key as keyof typeof __ENV__]) {
    return __ENV__[key as keyof typeof __ENV__] as string;
  }
  return defaultValue;
};

const config: Config = {
  API_URL: getEnvVariable("VITE_API_URL", "http://localhost:3000/api"),
  ITEMS_PER_PAGE: Number(getEnvVariable("VITE_ITEMS_PER_PAGE", "2")),
};

export default config;
