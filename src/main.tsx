// @ts-expect-error import issue
import React from 'react'
// @ts-expect-error import issue
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
