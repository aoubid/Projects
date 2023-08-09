import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../users.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private apiUrl = 'http://localhost:3000/users'; // Remplacez ceci par l'URL de votre API NestJS
  usersModel: any;


  constructor(private httpClient: HttpClient) { }

findAll() : Observable<User[]>{
  
 
    return this.httpClient.get<User[]>(this.apiUrl);
}


create(user: User): Observable<User> {
  return this.httpClient.post<User>(this.apiUrl, user)
}

remove(_id: string): Observable<User> {
  const url = `${this.apiUrl}/${_id}`;

  return this.httpClient.delete<User>(url)
  
}

findOne(_id: string) : Observable<User>{
  const url = `${this.apiUrl}/${_id}`;

 return this.httpClient.get<User>(url);

}

update(_id: string, UpdateUser: User): Observable<User> {
  const url = `${this.apiUrl}/${_id}`;

  return this.httpClient.patch<User>(url, UpdateUser)
  
}


}
