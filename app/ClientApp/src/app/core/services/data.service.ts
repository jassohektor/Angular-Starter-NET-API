import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { Observable, of, Subject } from 'rxjs';
import * as constants from "../../app.constants";

@Injectable()
export class DataService {
    private _apiUrl: string;
    public outUrl: Subject<string> =  new Subject<string>();
    constructor(private _httpClient: HttpClient) {
        this._apiUrl = constants.apiUrl;
        this.outUrl.subscribe((url: string)=>{
            if(url && url.includes("http")){
                this._apiUrl = url;
                console.log('[apiUrl]: ' + this._apiUrl);
            }
        });
    }

    private _getHeaders() {
        return new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Access-Control-Allow-Origin", "*");
            //.set("Authorization", token);
    }

    public get(url: string, params?: HttpParams): Observable<any> {
        const headers = this._getHeaders();
        return this._httpClient
            .get(this._apiUrl + url, { params: params, headers: headers })
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    return of(error);
                })
            );
    }

    public post(url: string, body: any): Observable<any> {
        const headers = this._getHeaders();
        return this._httpClient
            .post(this._apiUrl + url, body, { headers: headers })
            .pipe(map(response => response),
            catchError((error: HttpErrorResponse) => {
                return of(error);
            }));
    }

    public put(url: string, body?: any): Observable<any> {
        const headers = this._getHeaders();
        return this._httpClient.put(this._apiUrl + url, body, { headers: headers }).pipe(
            map(response => response),
            catchError(error => this.handleError(error))
        );
    }

    public delete(url: string): Observable<any> {
        const headers = this._getHeaders();
        return this._httpClient.delete(`${this._apiUrl}${url}`, { headers: headers }).pipe(
            map(response => response),
            catchError(error => this.handleError(error))
        );
    }

    private handleError(error: any) {
        //this._snackbarService.error(error.error ? error.error : error.status);
        return Observable.throwError(error.status);
    }
}
