import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { UsersService } from '../users/users.service';
import { User } from '../users.interface';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css']
})
export class ViewDetailComponent implements OnInit {

    user: User | undefined;
  
    constructor(
      private route: ActivatedRoute,
      private usersService: UsersService
    ) {}
  
    ngOnInit(): void {
      // Récupérez l'identifiant _id du user à partir des paramètres d'URL
      this.route.params.subscribe((params) => {
        const userId = params['_id'];
  
        // Appelez la méthode findOne pour récupérer les informations du user
        this.usersService.findOne(userId).subscribe((user) => {
          this.user = user;
        });
      });
    }
  }

 
