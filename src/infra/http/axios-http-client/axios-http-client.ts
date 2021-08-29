import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {HttpResponse} from '@/data/protocols/http/http-response';
import axios from 'axios';

// classe que torna o axios adaptável as interfaces e metodos criados na camada de dataLayer e Domain
export class AxiosHttpAdapterClient implements HttpPostClient<any, any> {
  // neste caso é any pq não sabemos como o axios pode retornar
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
