import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';
import { User } from '../users.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  
  constructor(private usersService: UsersService){}
  users$: Observable<User[]> = this.usersService.findAll();

  newUser: User = {
    
    matricule:'',
    name: '',
    lastName: '',
    adresse: '',
  };
  

  ngOnInit(): void {
  
  }

   // Méthode pour ajouter un nouvel utilisateur
   addUser(form: any) {
    if (form.valid) {
      // Appeler le service pour ajouter le nouvel utilisateur
      this.usersService.create(this.newUser).subscribe(() => {
        // Réinitialiser les champs du formulaire
        this.newUser = {
          
          matricule:'',
          name: '',
          lastName: '',
          adresse: '',
        };
        // Recharger la liste des utilisateurs
        this.users$ = this.usersService.findAll();
        window.confirm('ajout effectué avec succés');


      });
    }
  }

  

}
