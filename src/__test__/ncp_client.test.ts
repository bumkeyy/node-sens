const axios = require('axios');
import { NCPClient } from '../ncp_client';

jest.mock('axios');

const to = '000';
const content = 'test message';
const phoneNumber = 'phonenumber';
const serviceId = 'serviceId';
const secretKey = 'secretKey';
const accessKey = 'accessKey';

describe('NCP Client', () => {
  let ncp: NCPClient;

  beforeEach(() => axios.mockClear());

  beforeAll(() => {
    ncp = new NCPClient({
      phoneNumber,
      serviceId,
      secretKey,
      accessKey,
    });
  });

  test('create NCP Client', () => {
    expect(
      () =>
        new NCPClient({
          phoneNumber,
          serviceId,
          secretKey,
          accessKey,
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
    const { success, msg, status } = await ncp.sendSMS({
      to,
      content,
    });
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
    const { success, msg, status } = await ncp.sendSMS({
      to,
      content,
    });
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
    const { success, msg, status } = await ncp.sendSMS({
      to,
      content,
    });

    expect(success).toBe(false);
    expect(msg).toBe('Not Found');
    expect(status).toBe(404);
  });
});
