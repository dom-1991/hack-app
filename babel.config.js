module.exports = {
    presets: ['module:metro-react-native-babel-preset'],

    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.ts',
                    '.tsx',
                    '.json',
                ],
                alias: {
                    '@assets': './src/assets',
                    '@assets/*': './src/assets/*',
                    '@components': './src/components',
                    '@components/*': './src/components/*',
                    '@screens': './src/screens',
                    '@navigation': './src/navigation',
                    '@api': './src/api',
                    '@redux': './src/redux',
                    '@enum': './src/enum',
                    '@utils': './src/utils',
                    '@types': './src/types',
                },
            },
            'react-native-reanimated/plugin',
        ],
    ],
};
