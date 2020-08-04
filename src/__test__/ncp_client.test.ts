import { NCPClient } from '../ncp_client';

describe('NCP Client', () => {
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

  test('Authentication Failed, This account is not allowed', async () => {
    const result = await new NCPClient({
      phoneNumber: 'phonenumber',
      serviceId: 'serviceId',
      secretKey: 'secretKey',
      accessKey: 'accessKey',
    }).sendSMS('phonenumber', 'Hello');

    expect(result).toBe(false);
  });
});
