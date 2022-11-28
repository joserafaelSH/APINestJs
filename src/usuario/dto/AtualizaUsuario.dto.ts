import { IsEmail, IsNotEmpty,  IsOptional,  MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";


export class AtualizaUsuarioDTO{

    @IsNotEmpty({message: 'O nome é obrigatório'})
    @IsOptional()
    nome: string;

    
    @IsEmail(undefined, {message: 'O email é inválido'})
    @EmailEhUnico({message: 'O email já está em uso'})
    @IsOptional()
	email: string;

    @MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
    @IsOptional()
	senha: string;
}