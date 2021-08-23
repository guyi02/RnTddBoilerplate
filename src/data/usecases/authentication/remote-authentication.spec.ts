import {RemoteAuthentication} from './remote-authentication';
import {HttpPostClientMock} from '@/data/test/mock-http-client';
import {HttpStatusCode} from '@/data/protocols/http/http-response';
import {mockAccountModel, mockAuthentication} from '@/domain/test/mock-account';
import {InvalidCredentialsError} from '@/domain/errors/invalid-credentials-error';
import {UnexpectedError} from '@/domain/errors/unexpected-error';
import {AuthenticationParams} from '@/domain/usecases/authentication';
import {AccountModel} from '@/domain/models/account-model';
import faker from 'faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientMock: HttpPostClientMock<AuthenticationParams, AccountModel>;
};
// factory
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientMock);
  return {
    sut,
    httpPostClientMock,
  };
};

describe('Remote Authentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const {sut, httpPostClientMock} = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientMock.url).toBe(url);
  });

  test('should call HttpPostClient with correct Body', async () => {
    const {sut, httpPostClientMock} = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientMock.body).toEqual(authenticationParams);
  });

  test('should throw UnexpectedError if HttpStatusClient returns 400', async () => {
    const {sut, httpPostClientMock} = makeSut();
    // mock da implementação
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    // para teste de exceção no jest precisamos capturar como uma promisse
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test('should throw InvalidCredentialsError if HttpStatusClient returns 401', async () => {
    const {sut, httpPostClientMock} = makeSut();
    // mock da implementação
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    // para teste de exceção no jest precisamos capturar como uma promisse
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new InvalidCredentialsError());
  });

  test('should throw UnexpectedError if HttpStatusClient returns 404', async () => {
    const {sut, httpPostClientMock} = makeSut();
    // mock da implementação
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.notFound,
    };
    // para teste de exceção no jest precisamos capturar como uma promisse
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpStatusClient returns 500', async () => {
    const {sut, httpPostClientMock} = makeSut();
    // mock da implementação
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.serverError,
    };
    // para teste de exceção no jest precisamos capturar como uma promisse
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test('should return an AccountModel if HttpClient returns 200', async () => {
    const {sut, httpPostClientMock} = makeSut();
    const httpResult = mockAccountModel();
    // mock da implementação
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    // para teste de exceção no jest precisamos capturar como uma promisse
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
