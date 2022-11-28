import { CaracteristicasProdutoDTO } from "./CaracteristicasProduto.dto";
import { ImagemProdutoDTO } from "./ImagemProduto.dto";

export class ListaProdutoDTO {

    constructor (
        readonly id: string,
        readonly usuarioId: string,
        readonly nome: string,
        readonly valor: number,
        readonly quantidade: number,
    ){}
    
  }