import path from 'path';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src')],
        additionalData: `
      @use "sass:color";
      @use '@/shared/styles/variables' as *;
    `,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webpack: (config: {resolve: {alias: any;};}) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src'),
        };
        return config;
    },
};

export default nextConfig;
