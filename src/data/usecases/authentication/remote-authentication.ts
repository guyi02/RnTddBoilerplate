//Interface segregation principal :
// torna uma interface responsavel por um metodo, ao invés de uma interface que seja reponsavel por varios (get, post, put)
// desta forma a implemetação não é obrogada a implementar metodos que não irá utilizar (neste caso somente o post)
import {AuthenticationParams} from '@/domain/usecases/authentication';
import {HttpPostClient} from '@/data/protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
  }
}
