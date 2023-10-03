import { filter } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data-service.service';
import { MoviesCommentsService } from 'src/app/shared/movies-comments.service';
import { MovieComments, NewUserType } from 'src/utils/new-user-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetUsersService } from 'src/app/shared/get-users.service';

@Component({
  selector: 'app-movies-comments',
  templateUrl: './movies-comments.component.html',
  styleUrls: ['./movies-comments.component.scss'],
})
export class MoviesCommentsComponent implements OnInit {
  movieComments!: any;
  userId!: string | any;
  userName!: string;
  formulario!: FormGroup;
  doesThisMovieHasComments!: boolean;
  newComment!: any;
  @Input() movieId!: any;

  constructor(
    private serviceMoviesComments: MoviesCommentsService,
    private dataService: DataService,
    private serviceGetUsers: GetUsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getUserName();

    // Criando o formulário
    this.formulario = this.formBuilder.group({
      newComment: [null, [Validators.required]],
    });

    // Pegando o id do usuário do local storage
    this.userId = this.dataService.getUserId();

    // Pega os comentários já existentes do filme
    this.getMovieCommentFromService();

    // Checar se já existem comentários do filme na database:
    this.serviceMoviesComments.getMovieComment().subscribe((data: any) => {
      if (data.commentsInfo) {
        this.doesThisMovieHasComments = true;
      } else {
        this.doesThisMovieHasComments = false;
      }
    });
  }

  // Função executada ao clicar em enviar
  onCommentSubmit() {
    console.log('O comentário foi: ', this.getCommentContent());
    console.log('Data é', this.getTodayDate());
    console.log('Filme já tem comentários: ', this.doesThisMovieHasComments);

    // Se filme já tiver comentários
    if (this.doesThisMovieHasComments) {
      // Faz o push do novo comentário
      this.movieComments.commentsInfo.push({
        userName: this.userName,
        date: this.getTodayDate(),
        content: this.getCommentContent(),
      });
      this.newComment = this.movieComments;

      // Envia de fato o novo comentário
      this.serviceMoviesComments
        .addMovieComment(this.newComment, this.movieId)
        .subscribe((data) => console.log('O que foi enviado foi:', data));
    } else {
      // Se filme não tiver comentários --> Criar novo id do filme e colocar o comentário
      this.newComment = {
        id: this.movieId,
        commentsInfo: [
          {
            userName: this.userName,
            date: this.getTodayDate(),
            content: this.getCommentContent(),
          },
        ],
      };

      // Enviando de fato o novo filme com comentários, como POST
      this.serviceMoviesComments
        .addMovieCommentNew(this.newComment)
        .subscribe(() => {
          console.log('Comentário foi gerado');
        });

      this.getMovieCommentFromService();
    }
  }

  // Funções auxiliares:
  getMovieCommentFromService() {
    this.serviceMoviesComments.getMovieComment().subscribe((data: any) => {
      this.movieComments = data.find((f: MovieComments) => {
        return this.movieId === f.id; // O f.id representa o id do filme
      });
      console.log('Valor de movieComments é: ', this.movieComments);
    });
  }

  getCommentContent() {
    return this.formulario.value.newComment;
  }

  getTodayDate() {
    const date = new Date();
    const day = String(date.getDay()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const today = `${day}/${month}/${year}`;
    return today;
  }

  getUserName() {
    this.serviceGetUsers.getUsers().subscribe((data: any) => {
      // console.log('Todos usuários: ', data);
      this.userName = data.find((f: NewUserType) => f.id == this.userId).nome;
      // console.log('Usuário atual', this.userName);
      // console.log('Nome do usuário atual', this.userName.nome);
    });
  }
}
