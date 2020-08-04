import request from 'request';
import crypto from 'crypto';

export type NCPClientOptions = {
  phoneNumber: string;
  serviceId: string;
  secretKey: string;
  accessKey: string;
};

export class NCPClient {
  private phoneNumber: string;
  private serviceId: string;
  private secretKey: string;
  private accessKey: string;

  private url: string;
  private method: string;
  private signature: string;
  private timestamp: string;

  /**
   *
   * Constructs an instance of NCPClient.
   *
   * @param phoneNumber 발신 전화번호
   *
   * @param serviceId 프로젝트의 서비스 id
   *
   * @param secretKey 프로젝트 계정의 secretKey
   *
   * @param accessKey 프로젝트 계정의 accessKey
   */
  constructor(options: NCPClientOptions) {
    const { phoneNumber, serviceId, secretKey, accessKey } = options;
    this.phoneNumber = phoneNumber;
    this.serviceId = serviceId;
    this.secretKey = secretKey;
    this.accessKey = accessKey;
    this.url = `https://sens.apigw.ntruss.com/sms/v2/services/${this.serviceId}/messages`;
    this.timestamp = Date.now().toString();
    this.method = 'POST';

    const space = ' ';
    const newLine = '\n';
    const message = [];
    const hmac = crypto.createHmac('sha256', this.secretKey);
    const url2 = `/sms/v2/services/${this.serviceId}/messages`;

    message.push(this.method);
    message.push(space);
    message.push(url2);
    message.push(newLine);
    message.push(this.timestamp);
    message.push(newLine);
    message.push(this.accessKey);

    this.signature = hmac.update(message.join('')).digest('base64');
  }

  /**
   *
   * SMS를 보내는 함수
   *
   * @param to 수신 전화번호
   * @param content 전달할 내용
   * @param countryCode 국가 코드 (default 82)
   *
   * @returns Promise any
   *
   */
  public sendSMS(to: string, content: any, countryCode: string = '82') {
    return new Promise((resolve, reject) => {
      request(
        {
          method: this.method,
          json: true,
          uri: this.url,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': this.accessKey,
            'x-ncp-apigw-timestamp': this.timestamp,
            'x-ncp-apigw-signature-v2': this.signature,
          },
          body: {
            type: 'SMS',
            contentType: 'COMM',
            countryCode,
            from: this.phoneNumber,
            content,
            messages: [
              {
                to: `${to}`,
              },
            ],
          },
        },
        (err, res, html) => {
          if (!err && res.statusCode === 202) {
            console.log(html);
            resolve(true);
          } else if (html.error) {
            console.log(`${html.error.message}, ${html.error.details}`);
            reject(false);
          } else {
            console.log(err);
            reject(false);
          }
        }
      );
    }).catch((err: any) => {
      console.log(err);
      return false;
    });
  }
}
