import { Component, OnInit } from '@angular/core';
import { User } from '../users.interface';
import { UsersService } from '../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  selectedUser: User = {
    matricule: '',
    name: '',
    lastName: '',
    adresse: ''
  };

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du utilisateur à partir de l'URL
    const _id = this.route.snapshot.paramMap.get('_id');
  
    if (_id) {
      // Appeler le service pour obtenir les détails du utilisateur
      this.usersService.findOne(_id).subscribe(
        (user) => {
          // Mettre à jour la valeur de selectedUser avec les détails du utilisateur
          this.selectedUser = user;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID du utilisateur non défini.");
    }
  }
 
  // Méthode pour mettre à jour le utilisateur
  updateUser(form: any) {
    if (form.valid) {
      // Appeler le service pour mettre à jour le utilisateur
      if (this.selectedUser && this.selectedUser._id) {
        this.usersService.update(this.selectedUser._id, this.selectedUser).subscribe(
          () => {
            // La mise à jour a réussi, afficher un message de succès à l'utilisateur
            console.log("Mise à jour réussie !");
            // Rediriger vers la liste des utilisateurs après la mise à jour
            this.router.navigate(['/users']);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("ID du utilisateur non défini.");
      }
    }
  }
}