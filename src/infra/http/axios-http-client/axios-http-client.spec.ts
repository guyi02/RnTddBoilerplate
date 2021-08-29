import {AxiosHttpAdapterClient} from './axios-http-client';
import {HttpPostParams} from '@/data/protocols/http/http-post-client';
import axios from 'axios';
import faker from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: Number(faker.finance.account()),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

// factory
const makeSut = (): AxiosHttpAdapterClient => {
  return new AxiosHttpAdapterClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});