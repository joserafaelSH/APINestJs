import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Min, ValidateNested } from "class-validator";
import { CaracteristicasProdutoDTO } from "./CaracteristicasProduto.dto";
import { ImagemProdutoDTO } from "./ImagemProduto.dto";

export class CriaProdutoDTO{

    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    usuarioId: string;

    @IsString({message: 'O nome do produto deve ser uma string'})
    @IsNotEmpty({message: 'O nome é obrigatório'})
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    valor: number;

    @IsPositive({message: 'O valor deve ser positivo'})
	quantidadeDisponivel: number;

    @IsString()
    @IsNotEmpty({message: 'A descrição é obrigatória'})
	descricao: string;

    @ValidateNested()
    @IsArray()
    @Type(() => CaracteristicasProdutoDTO)
    caracteristicas: CaracteristicasProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @Type(() => ImagemProdutoDTO)
	imagens:ImagemProdutoDTO[];

    @IsNotEmpty({message: 'A categoria é obrigatória'})
	categoria: string;

    @IsNotEmpty({message: 'A data de criação deve ser uma data'})
	dataCriacao: Date;

    @IsNotEmpty({message: 'A data de atualização deve ser uma data'})
	dataAtualizacao: Date
}

