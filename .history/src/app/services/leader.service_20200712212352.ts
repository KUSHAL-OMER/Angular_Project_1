import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      //Simulate Server latency with 2 seconds delay
      setTimeout(() => resolve(LEADERS), 2000);
  });
}

  getLeader(id: string): Promise<Leader> {
    return new Promise(resolve => {
      //Simulate Server latency with 2 seconds delay
      setTimeout(() => resolve((LEADERS.filter((lead) => (lead.id === id))[0])), 2000);
  });
}
  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      //Simulate Server latency with 2 seconds delay
      setTimeout(() => resolve(LEADERS.filter((lead) => lead.featured)[0]), 2000);
  });
}
}
