import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.page-d.html',
    styleUrls: ['./app.component.css']
})

export class PageDComponent {
    token                 = '';
    _apiService:ApiService;
    _username:string = '';
    _first_name:string = '';
    _last_name:string =  '';
    _street_address:string = '';
    _email:string = '';
    _phone:string = '';
    _roles:string[] = [];
    _all_users:[] = null;  
    display_role:string = '';
    public site='http://localhost:1337/';

    // Since we are using a provider above we can receive 
    // an instance through an constructor.
    constructor(private http: HttpClient, private router: Router) {
        // Pass in http module and pointer to AppComponent.
        this._apiService = new ApiService(http, this);
        this.getManagerData();
        this.getAllUser();
    }
    //------------------------------------------------------------
    // Either shows content when logged in or clears contents.
    //------------------------------------------------------------
    getManagerData() {
        // Logged in if token exists in browser cache.
        if(sessionStorage.getItem('auth_token')!=null) {
            this.token = sessionStorage.getItem('auth_token');
            this._apiService.getData('User/ManagerAreaJwt', this.managerDataCallback);
        }
    }

    managerDataCallback(result, _this) {
        if(result.errorMessage == "") {
            _this._roles = result.currUser.roles;
            _this._username = result.currUser.username;
            _this._first_name = result.currUser.firstname;
            _this._last_name = result.currUser.lastname;
            _this._street_address = result.currUser.streetaddress;
            _this._email = result.currUser.email;
            _this._phone = result.currUser.phonenumber;
            _this.getDispalyRole();
        }
        else {
            alert(JSON.stringify(result.errorMessage));
        }   
    }

    get isManager() {
        if(this._roles != null) {
            for (var i=0; i< this._roles.length; i++){
               if(this._roles[i] === 'Manager' || this._roles[i] === 'HR') {
                    return true
               } 
            }
        }
        return false;
    }

    get isHR() {
        if(this._roles != null) {
            for (var i=0; i< this._roles.length; i++){
               if(this._roles[i] === 'HR') {
                    return true
               } 
            }
        }
        return false;
    }

    logout() {
        sessionStorage.clear();   
        // Clear data. 
        this._username = '';
        this._first_name = '';
        this._last_name =  '';
        this._street_address = '';
        this._email = '';
        this._phone = '';
        this._roles = [];
    }

    getAllUser() {
        this._apiService.getData('User/AllUsers', this.getAllUserCallback);    
    }

    getAllUserCallback(result, _this) {
            _this._all_users = result.all_users;
    }

    getDispalyRole() {
        if(this.isHR) {
            this.display_role = 'HR';
        } else if (this.isManager) {
            this.display_role = 'Managers';
        } else if (this.token != '') {
            this.display_role = 'Staff';
        } else {
            this.display_role = 'ALL';
        }
    }
}
