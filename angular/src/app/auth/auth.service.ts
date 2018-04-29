import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {

  USERS_API = 'api/users';
  auth0 = new auth0.WebAuth({
    clientID: 'DsaXvzTXma104x2s6ewF4wLhneEPfeND',
    domain: 'swen-344-fm.auth0.com',
    responseType: 'token id_token',
    audience: 'https://swen-344-fm.auth0.com/userinfo',
    redirectUri: location.origin,
    scope: 'openid profile'
  });

  userProfile: any;

  constructor(public router: Router, private http: HttpClient) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);

        //INSERT USER INTO DATABASE IF NOT THERE
        this.getProfile((error,profile) => {
          var userId = profile.sub;
          if(profile && userId){
            localStorage.setItem('user_id', userId);
            this.http.get(this.USERS_API + '/' + userId).subscribe((result) => {
              if(result['status'] == true) {
                if(result['users'].length == 0) {
                  const httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json'
                    })
                  };
                  let body = {
                    role: 'student',
                    name: profile.name,
                    email: profile.nickname + "@g.rit.edu",
                    authId: userId
                  };
                  this.http.post(this.USERS_API + '/', body, httpOptions).subscribe((result) => {
                    if(result) {
                      console.log("Successfully Saved!");
                      console.log("ID " + result['user']['id'])
                      localStorage.setItem("userId", result['user']['id'])
                    }
                  });
                } else {
                  console.log(result);
                  localStorage.setItem("userId", result['users'][0]['id']);
                }
              } else {
                console.log("Something bad happened with the GET user query");
              }
            });
          }
        });
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log(authResult);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


}
