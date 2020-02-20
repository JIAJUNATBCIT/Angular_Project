import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.page-b.html',
    styleUrls: ['./app.component.css']
})

export class PageBComponent {
    token                 = '';
    _apiService:ApiService;
    _username:string = '';
    _first_name:string = '';
    _last_name:string =  '';
    _street_address:string = '';
    _email:string = '';
    _phone:string = '';
    _password:string ='';
    _password_confirm:string = '';
    _roles:string[] = ["Staff"];
    _errorMessage:string = '';
    public site='http://localhost:1337/';

    // Since we are using a provider above we can receive 
    // an instance through an constructor.
    constructor(private http: HttpClient, private router: Router) {
        // Pass in http module and pointer to AppComponent.
        this._apiService = new ApiService(http, this);
    }

    register() {
        let url = this.site + "User/Register";
        // This free online service receives post submissions.
        this.http.post(url,
            {
                username:  this._username,
                firstname:   this._first_name,
                lastname: this._last_name,
                street_address: this._street_address,
                email: this._email,
                phone: this._phone,
                password: this._password,
                passwordConfirm: this._password_confirm,
                roles: this._roles
            })
        .subscribe(
            // Data is received from the post request.
            (data) => {
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", 
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                if(this._errorMessage == '') {
                    this.login();               
                }  
            },
            // An error occurred. Data is not received. 
            error => {
                this._errorMessage = error;                
            });       
    }

    login() {
        let url = this.site + "auth";
       
        // This free online service receives post submissions.
        this.http.post(url, {
          username:  this._username,
          password:  this._password,
        }).subscribe( 
          // Data is received from the post request.
          (data) => {
            // Inspect the data to know how to parse it.
            console.log(JSON.stringify(data));
                
            if(data["token"]  != null)  {
              this.token = data["token"]     
              sessionStorage.setItem('auth_token', data["token"]);
              this.router.navigate(['User/Profile'])
            }    
          },
          // An error occurred. Data is not received. 
          error => {
            console.log(JSON.stringify(error));             
          });
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
        this._password ='';
        this._password_confirm = '';
        this._roles = [];
        this.token = '';
    }

    selectCheckBox(check:boolean, value: string) {
        if(check) {
            if (this._roles.indexOf(value) == -1) {
                this._roles.push(value)
            }
        } else {
            if (this._roles.indexOf(value) > -1) {
                this._roles.splice(this._roles.indexOf(value), 1)
            }
        }
    }
}
