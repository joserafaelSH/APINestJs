import { IsEmail, IsNotEmpty,  MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";


export class CriaUsuarioDTO{

    @IsNotEmpty({message: 'O nome é obrigatório'})
    nome: string;

    @IsEmail(undefined, {message: 'O email é inválido'})
    @EmailEhUnico({message: 'O email já está em uso'})
	email: string;

    @MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
	senha: string;
}