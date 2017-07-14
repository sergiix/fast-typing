function getVendorLibraries () {
	return [
		'react',
		'react-dom',
		'redux',
		'react-classset',
		'redux-thunk',
		'whatwg-fetch',
		'd3'
	];
}
module.exports.getEntry = function (params) {
	let entry = {
		app: [params.SRC_JS_DIR + 'app.js']
	};
	let vendors = getVendorLibraries();

	if (vendors.length)
		entry.vendors = vendors;

	return entry;
}
