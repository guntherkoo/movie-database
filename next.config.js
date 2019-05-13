const compose = require('next-compose');
const withSass = require('@zeit/next-sass');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const sass = {
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[name]-[local]-[hash:base64:5]',
	},
	webpack: config => {
		config.module.rules.unshift({
			test: /\.scss$/,
			use: ['classnames-loader'],
		});
		return config;
	},
};

const isProd = process.env.NODE_ENV === 'production';

module.exports = Object.assign(
	compose([
		[withSass, sass],
		{
			webpack: config => {
				config.plugins.push(new LodashModuleReplacementPlugin({
					shorthands: true,
				}));

				return config;
			},
		}
		/*
		{
		webpack: config => {
		config.module.rules.push({
		test: /\.(woff|woff2|eot|ttf|otf)$/,
		use: 'file-loader',
		});

		return config;
		}
		}*/
	]),
	{
		target: 'serverless',
		generateBuildId: async () => {
		// const fromGit = await nextBuildId({
		//   dir: __dirname,
		// });

		return process.env.GIT_COMMIT || "localMachine";
		},
	},
);
