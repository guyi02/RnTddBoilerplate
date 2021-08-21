import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';

export class HttpPostClientMock implements HttpPostClient {
  url?: string;
  body?: object;
  async post(param: HttpPostParams): Promise<void> {
    this.url = param.url;
    this.body = param.body;
    return Promise.resolve();
  }
}
