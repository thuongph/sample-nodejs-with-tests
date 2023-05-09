'use strict';
const axios = require('axios');
const Service = require('../src/service');

jest.mock('axios');

describe('should test Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('when #list method succeeds', async () => {
    const responseData = {
      data: {
        field: 'field',
      },
    };
    const demoResponseData = {
      data: {
        field: 'and another test field 10.05.23',
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(responseData));

    const response = await Service.list();
    expect(response).toEqual(demoResponseData.data);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('when #list method fails', async () => {
    const errorMessage = 'Network Error';
    try {
      const errorData = new Error(errorMessage);
      axios.get.mockImplementationOnce(() => Promise.reject(errorData));
      await Service.list();
      throw new Error('default error to invalidate a false positive test case');
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
      expect(axios.get).rejects;
      expect(axios.get).toHaveBeenCalledTimes(1);
    }
  });
});
