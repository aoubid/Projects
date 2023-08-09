import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { User } from '../users.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router){}
  filterNom: string = '';
  filterPrenom: string = '';
  filterMatricule: string = '';
  

  goToAdd() {
    this.router.navigate(['/add-user']);
  }
  

 

  users$: Observable<User[]> = this.usersService.findAll();
  
 

  ngOnInit(): void {
  
  }
  
  resetFilters() {
    this.filterNom = '';
    this.filterPrenom = '';
    this.filterMatricule = '';
  }

  async deleteUser(_id: string) {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

    if (confirmDelete) {
    try {
      await this.usersService.remove(_id).subscribe(() => {
        // Reload the list of users after deletion
        this.users$ = this.usersService.findAll();
      });
    } catch (error) {
      console.error(error);
    }
  
  }}}