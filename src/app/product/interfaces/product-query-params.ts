import { QueryParams } from "@core/interfaces/queryparams";

export interface ProductQueryParams extends QueryParams {
    categoryId?: number;
}