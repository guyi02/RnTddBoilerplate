import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';

export class HttpPostClientMock implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  };
  async post(param: HttpPostParams): Promise<HttpResponse> {
    this.url = param.url;
    this.body = param.body;
    return Promise.resolve(this.response);
  }
}
