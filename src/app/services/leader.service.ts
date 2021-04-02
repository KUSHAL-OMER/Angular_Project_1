import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
}

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
}
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
    .pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
}
getLeaderIds(): Observable<string[] | any> {
  return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id)))
  .pipe(catchError(error => error));
}

putLeader(leader: Leader): Observable<Leader> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  return this.http.put<Leader>(baseURL + 'leadership/' + leader.id, leader, httpOptions)
  .pipe(catchError(this.ProcessHTTPMsgService.handleError));
}
}
