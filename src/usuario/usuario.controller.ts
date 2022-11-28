import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";


@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository){}
    

    @Post()
    async criaUsuario(@Body()dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.id = uuid();
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        this.usuarioRepository.salvar(usuarioEntity);
        return {message: 'Usuario criado com sucesso', usuario: new ListaUsuarioDTO(
            usuarioEntity.id, 
            usuarioEntity.nome
        )};
        
    }

    @Get()
    async listaUsuarios(){
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            (usuario)=> new ListaUsuarioDTO(
                usuario.id, 
                usuario.nome
            )
        );
        
        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id:string, @Body() novosDados:AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
        return {message: 'Usuario atualizado com sucesso', usuario: usuarioAtualizado}
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id:string){
        const usuarioRemovido = await this.usuarioRepository.remove(id);
        return {message: 'Usuario removido com sucesso', usuario: usuarioRemovido}
    }
}