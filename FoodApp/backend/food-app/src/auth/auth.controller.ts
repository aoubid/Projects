import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user: any) {
        if (user.username === 'utilisateur' && user.password === 'motdepasse') {
            // Si l'authentification réussit, générez un jeton JWT en utilisant le service d'authentification
            const token = this.authService.login(user);
      
            // Retournez le jeton JWT comme réponse
            return { access_token: token };
          } else {
            // Si l'authentification échoue, renvoyez une erreur 401 (Non autorisé)
            throw new HttpException('Identifiants incorrects', HttpStatus.UNAUTHORIZED);
          }
        }
    }
    


