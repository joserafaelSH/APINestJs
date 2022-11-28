import { CaracteristicasProdutoDTO } from "./dto/CaracteristicasProduto.dto";
import { ImagemProdutoDTO } from "./dto/ImagemProduto.dto";

export class ProdutoEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidade: number;
    descricao: string;
    categoria: string;
    caracteristicas: CaracteristicasProdutoDTO[];
    imagens: ImagemProdutoDTO[]
}