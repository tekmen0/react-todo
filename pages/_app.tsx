import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
