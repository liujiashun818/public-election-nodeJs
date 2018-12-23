import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers , createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { routerReducer} from 'react-router-redux';
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
/*import injectTapEventPlugin from 'react-tap-event-plugin';*/
/*injectTapEventPlugin();*/
const store = createStore(
	combineReducers({ 
		router: routerReducer
	}),
	applyMiddleware(createLogger(),thunk)
);

var muiTheme = getMuiTheme({  
	palette: {
	    
	 },
}); 

ReactDOM.render(
	<Provider store={store} history={createHistory()}>
		<MuiThemeProvider muiTheme={muiTheme}>
		<Router>
			<App></App>
		</Router>
		</MuiThemeProvider>
	</Provider>
	
  ,
	document.getElementById('root'));
registerServiceWorker();




