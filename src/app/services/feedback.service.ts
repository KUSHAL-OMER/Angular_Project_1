import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }
    submitFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<Feedback>(baseURL + 'feedback/',feedback, httpOptions)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
    getFeedback() {
      return this.http.get<Feedback>(baseURL + 'feedback/')
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
    putFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.put<Feedback>(baseURL + 'feedback/' + feedback, feedback, httpOptions)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
}
