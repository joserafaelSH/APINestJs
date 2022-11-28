import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository{
    private produtos: ProdutoEntity[] = [];

    async salvar(produto: ProdutoEntity){
        this.produtos.push(produto);
    }

    async listar(){
        return this.produtos;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>){
        const dadosNaoAtualizaveis = ['id', 'usuarioId'];
        const possivelProduto = this.produtos.find(produto => produto.id === id);

        if(!possivelProduto){
            throw new Error('Produto não encontrado');
        }

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor])=>{
            if(dadosNaoAtualizaveis.includes(chave)){
                return;
            }
            possivelProduto[chave] = valor;
        })

        return possivelProduto;
    }

    async remove(id: string){
        const possivelProduto = this.produtos.find(produto => produto.id === id);

        if(!possivelProduto){
            throw new Error('Produto não encontrado');
        }

        this.produtos = this.produtos.filter(produto => produto.id !== id);
        return possivelProduto;
    }

}