import React from 'react';
import {Login} from '.';
import {
  render,
  fireEvent,
  RenderAPI,
} from '../../helpers/RenderStyledWithProps';

type SutTypes = {
  sut: RenderAPI;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />, {});
  return {
    sut,
  };
};

describe('Login component', () => {
  test('should input user render with value', () => {
    const {sut} = makeSut();
    const inputUser = sut.getByHintText('input-user');

    fireEvent.changeText(inputUser, 'teste');
    expect(inputUser.props.value).toBe('teste');
  });
});
