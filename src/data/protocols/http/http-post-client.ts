import {HttpResponse} from './http-response';

export type HttpPostParams<BodyType> = {
  url: string;
  body?: BodyType;
};
// utilzado o Generics pois quem a chamar precisa passar o tipo (T)
export interface HttpPostClient<BodyType, ReturnType> {
  post(params: HttpPostParams<BodyType>): Promise<HttpResponse<ReturnType>>;
}
