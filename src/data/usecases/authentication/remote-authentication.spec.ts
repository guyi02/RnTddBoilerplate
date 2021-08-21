import {RemoteAuthentication} from './remote-authentication';
import {mockAuthentication} from '@/domain/test/mock-authentication';
import {HttpPostClientMock} from '@/data/test/mock-http-client';
import faker from 'faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientMock: HttpPostClientMock;
};
// factory
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock();
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
});
