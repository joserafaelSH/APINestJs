import { Injectable } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";


@Injectable()
export class UsuarioRepository{
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity){
        this.usuarios.push(usuario);   
    }

    async listar(){
        return this.usuarios;
    }

    async buscarPorEmail(email: string){
        return this.usuarios.find(usuario => usuario.email === email);
    }

    async existeComEmail(email: string){
        const user = this.usuarios.some(usuario => usuario.email === email);
        return user !== undefined;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>){
        const possivelUsuario = this.usuarios.find(usuario => usuario.id === id);

        if(!possivelUsuario){
           throw new Error('Usuario não encontrado');
           
        }

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor])=>{
            if(chave  === 'id'){
                return;
            }
            possivelUsuario[chave] = valor;
        })

        return possivelUsuario;
        
    }

    async remove(id: string){
        const possivelUsuario = this.usuarios.find(usuario => usuario.id === id);

        if(!possivelUsuario){
            throw new Error('Usuario não encontrado');
        }

        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
        return possivelUsuario;
    }
}