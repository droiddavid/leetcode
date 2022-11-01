import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global.service';
import { HeaderService } from 'src/app/services/subjects/header.service';


interface Menu {
	url: string; 
	classes: string; 
	style: string; 
	icon: string; 
	heading: string; 
	text:string	
}

class MenuItem implements Menu {
	url: string = "";
	classes: string = "";
	style: string = "";
	icon: string = "";
	heading: string = "";
	text: string = "";

	constructor(url:string, classes:string, style:string, icon:string, heading:string, text:string) {
		this.url = url;
		this.classes = classes;
		this.style = style;
		this.icon = icon;
		this.heading = heading;
		this.text = text;
	}
}


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	user:any;

	//page main menu
	Menus: MenuItem[] = [];
	classes_default: string ="list-group-item list-group-item animated fadeInRight";
	classes_success: string ="list-group-item list-group-item-success animated fadeInRight";
	styles: string ="border-bottom: 1px solid #ffffff; font-size: x-large;";


	faHome = faHome;
	userData:any;

	constructor(
		private router: Router,
		private headerService: HeaderService
	) { }

	ngOnInit(): any {
		if (!(localStorage.getItem('user'))) {
			return {
				"name": "Error",
				"message": "Cannot find user in local storage."}
		}

		let localStorageUser: string | null = localStorage.getItem('user');

		if (localStorageUser) {
			//this.user = GlobalService.decode(JSON.parse(localStorageUser!));
			this.user = JSON.parse(GlobalService.decode(localStorageUser!));
			//debugger;
			this.displayMenu();
		}
	}


	goToAuth(): void {
		this.router.navigate(['auth']);
	}
	displayMenu(): void {
		this.addMenuItem(
			"lessons", 
			this.classes_success, 
			this.styles, 
			"fas fa-hamburger", 
			"Lessons", 
			"Take lessons."
		);
	}
	addMenuItem(url:string, classes:string, style:string, icon:string, heading:string, text:string) {
		this.Menus.push(new MenuItem(
			url, classes, 
			style, icon, 
			heading, text
		));
	};


	manage(page: string) {
		//may be deprecated.  check this...
		localStorage['previous_state'] = "dashboard";
		

		if (page == "profile") {		
			//emit title and menu to the header service.
			this.headerService.changeTitle('profilemenu');
			this.headerService.changeMenuItems('profilemenu');
			this.router.navigate(['/', 'profilemenu']);
		} else {		
			//emit title and menu to the header service.
			this.headerService.changeTitle(page);
			this.headerService.changeMenuItems(page);
			this.router.navigate([page]);
		}
	};

}
