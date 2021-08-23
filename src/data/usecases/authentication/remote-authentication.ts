//Interface segregation principal :
// torna uma interface responsavel por um metodo, ao invés de uma interface que seja reponsavel por varios (get, post, put)
// desta forma a implemetação não é obrogada a implementar metodos que não irá utilizar (neste caso somente o post)
import {AuthenticationParams} from '@/domain/usecases/authentication';
import {HttpPostClient} from '@/data/protocols/http/http-post-client';
import {HttpStatusCode} from '@/data/protocols/http/http-response';
import {InvalidCredentialsError} from '@/domain/errors/invalid-credentials-error';
import {UnexpectedError} from '@/domain/errors/unexpected-error';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;

      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();

      default:
        throw new UnexpectedError();
    }
  }
}
