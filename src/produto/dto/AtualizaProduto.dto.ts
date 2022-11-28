import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min, ValidateNested } from "class-validator";
import { CaracteristicasProdutoDTO } from "./CaracteristicasProduto.dto";
import { ImagemProdutoDTO } from "./ImagemProduto.dto";

export class AtualizaProdutoDTO{

    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    @IsOptional()
    usuarioId: string;

    @IsString({message: 'O nome do produto deve ser uma string'})
    @IsNotEmpty({message: 'O nome é obrigatório'})
    @IsOptional()
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    @IsOptional()
    valor: number;

    @IsPositive({message: 'O valor deve ser positivo'})
    @IsOptional()
	quantidadeDisponivel: number;

    @IsString()
    @IsNotEmpty({message: 'A descrição é obrigatória'})
    @IsOptional()
	descricao: string;

    @ValidateNested()
    @IsArray()
    @Type(() => CaracteristicasProdutoDTO)
    @IsOptional()
    caracteristicas: CaracteristicasProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @Type(() => ImagemProdutoDTO)
    @IsOptional()
	imagens:ImagemProdutoDTO[];

    @IsNotEmpty({message: 'A categoria é obrigatória'})
    @IsOptional()
	categoria: string;

    @IsNotEmpty({message: 'A data de criação deve ser uma data'})
    @IsOptional()
	dataCriacao: Date;

    @IsNotEmpty({message: 'A data de atualização deve ser uma data'})
    @IsOptional()
	dataAtualizacao: Date
}

