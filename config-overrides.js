const {
	override,
	fixBabelImports,
	addLessLoader,
	addPostcssPlugins
} = require("customize-cra");


module.exports = override(
	fixBabelImports("antd-mobile",
		{
			libraryDirectory: "es", style: 'css' // change importing css to less
		}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: require('./package.json').theme
	}),
	addPostcssPlugins([
		require('postcss-pxtorem')({
			rootValue: 37.5,
			unitPrecision: 5,
			propList: ['*'],
			selectorBlackList: [],
			replace: true,
			mediaQuery: true,
			minPixelValue: 16
		}),
	]),
);
