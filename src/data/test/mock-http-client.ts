import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';

export class HttpPostClientMock<BodyType, ReturnType>
  implements HttpPostClient<BodyType, ReturnType>
{
  url?: string;
  body?: BodyType;
  response: HttpResponse<ReturnType> = {
    statusCode: HttpStatusCode.ok,
  };
  async post(
    param: HttpPostParams<BodyType>,
  ): Promise<HttpResponse<ReturnType>> {
    this.url = param.url;
    this.body = param.body;
    return Promise.resolve(this.response);
  }
}
