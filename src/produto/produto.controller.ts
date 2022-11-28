import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoRepository } from "./produto.repository";
import { v4 as uuid } from "uuid";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Controller('/produtos')
export class ProdutoController{
    constructor(private produtoRepository: ProdutoRepository){} 

    @Post()
    async criaProduto(@Body() dadosProduto: CriaProdutoDTO){

        const produto = new ProdutoEntity();
        produto.id = uuid();
        produto.nome = dadosProduto.nome;
        produto.usuarioId = dadosProduto.usuarioId;
        produto.valor = dadosProduto.valor;
        produto.quantidade = dadosProduto.quantidadeDisponivel;
        produto.descricao = dadosProduto.descricao;
        produto.categoria = dadosProduto.categoria;
        produto.caracteristicas = dadosProduto.caracteristicas;
        produto.imagens = dadosProduto.imagens;

        this.produtoRepository.salvar(produto);

        return {message: 'Produto criado com sucesso', usuario: new ListaProdutoDTO(
            produto.id, 
            produto.usuarioId,
            produto.nome,
            produto.valor,
            produto.quantidade,
        )};

        
    }

    @Get()
    async listaProdutos(){

        const produtosSalvos = await this.produtoRepository.listar();
        const produtosLista = produtosSalvos.map(
            (produto)=> new ListaProdutoDTO(
                produto.id, 
                produto.usuarioId,
                produto.nome,
                produto.valor,
                produto.quantidade,
            )
        );
        return produtosLista;
    }

    @Put('/:id')
    async atualizaProduto(@Param('id') id:string, @Body() novosDados: AtualizaProdutoDTO){
        const produtoAtualizado = await this.produtoRepository.atualiza(id, novosDados);
        return {message: 'Produto atualizado com sucesso', usuario: produtoAtualizado}
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id:string){
        const produtoRemovido = await this.produtoRepository.remove(id);
        return {message: 'Produto removido com sucesso', usuario: produtoRemovido}
    }
}