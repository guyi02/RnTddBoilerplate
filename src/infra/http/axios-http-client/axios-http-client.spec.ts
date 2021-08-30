import {AxiosHttpAdapterClient} from './axios-http-client';
import {HttpPostParams} from '@/data/protocols/http/http-post-client';
import {mockAxios} from '@/infra/http/test/mock-axios';
import axios from 'axios';
import faker from 'faker';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpAdapterClient;
  mockedAxios: jest.Mocked<typeof axios>;
};
// factory
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpAdapterClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockPostRequest();
    const {sut, mockedAxios} = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', () => {
    const {sut, mockedAxios} = makeSut();
    const promisse = sut.post(mockPostRequest());
    const res = mockedAxios.post.mock.results[0].value;
    expect(promisse).resolves.toBe(res);
  });
});
