import { OmitType } from "@nestjs/swagger";
import { CreateProductDTO } from "src/product/dto/create-product.dto";

export class UpdateProductDTO extends OmitType(CreateProductDTO, ['img'] as const) { }