import { Module } from "asab_webui_components";

import { TableScreen } from './TableScreen.jsx';
import { DetailScreen } from './DetailScreen.jsx';


export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule");

		app.Router.addRoute({
			path: "/",
			end: false,
			name: 'Table',
			component: TableScreen,
		});

		app.Navigation.addItem({
			name: "Table",
			icon: 'bi bi-table',
			url: "/",
		});


		app.Router.addRoute({
			path: "/detail/:id",
			end: false,
			name: 'Detail',
			component: DetailScreen,
		});
	}
}
