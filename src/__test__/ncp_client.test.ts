const axios = require('axios');
import { NCPClient } from '../ncp_client';

jest.mock('axios');

describe('NCP Client', () => {
  let ncp: NCPClient;

  beforeEach(() => axios.mockClear());

  beforeAll(() => {
    ncp = new NCPClient({
      phoneNumber: 'phonenumber',
      serviceId: 'serviceId',
      secretKey: 'secretKey',
      accessKey: 'accessKey',
    });
  });

  test('create NCP Client', () => {
    expect(
      () =>
        new NCPClient({
          phoneNumber: 'phonenumber',
          serviceId: 'serviceId',
          secretKey: 'secretKey',
          accessKey: 'accessKey',
        })
    ).not.toThrow();
  });

  test('send SMS success', async () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        status: 202,
        statusText: 'Accepted',
      })
    );
    const { success, msg, status } = await ncp.sendSMS('0000', 'Test Message');
    expect(success).toBe(true);
    expect(msg).toBe('Accepted');
    expect(status).toBe(202);
  });

  test('Authentication Failed, This account is not allowed', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 401,
          statusText: 'Unauthorized',
        },
      })
    );
    const { success, msg, status } = await ncp.sendSMS('0000', 'Test Message');

    expect(success).toBe(false);
    expect(msg).toBe('Unauthorized');
    expect(status).toBe(401);
  });

  test('PhoneNumber is not found', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 404,
          statusText: 'Not Found',
        },
      })
    );
    const { success, msg, status } = await ncp.sendSMS('0000', 'Test Message');

    expect(success).toBe(false);
    expect(msg).toBe('Not Found');
    expect(status).toBe(404);
  });
});
