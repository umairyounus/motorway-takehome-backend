type Config = {
  isProd: boolean;
  port: number;
  pg: {
    connection: string;
  };
};

const config: Config = {
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.NODE_PORT ? parseInt(process.env.NODE_PORT, 10) : 3000,
  pg: {
    connection: process.env.PG_CONNECTION || 'postgresql://user:password@localhost/motorway',
  },
};

export default config;
