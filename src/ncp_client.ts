import axios from 'axios';
import crypto from 'crypto';

export type NCPClientOptions = {
  phoneNumber: string;
  serviceId: string;
  secretKey: string;
  accessKey: string;
};

export type sendSMSType = {
  to: string;
  content: string;
  countryCode?: string;
};

export type sendSMSReturnType = {
  success: boolean;
  msg: string;
  status: number;
};

export type prepareSignatureReturnType = {
  timestamp: string;
  signature: string;
};

export class NCPClient {
  private phoneNumber: string;
  private serviceId: string;
  private secretKey: string;
  private accessKey: string;

  private url: string;
  private method: string;

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
    this.method = 'POST';
  }

  /**
   *
   * SMS를 보내는 함수
   *
   * @param to 수신 전화번호
   * @param content 전달할 내용
   * @param countryCode 국가 코드 (default 82)
   *
   * @returns Promise with success(boolean), msg(string), status(number)
   *
   */
  public async sendSMS({
    to,
    content,
    countryCode = '82'
  }: sendSMSType): Promise<sendSMSReturnType> {
    try {
      const {timestamp, signature} = this.prepareSignature()
      const response = await axios({
        method: 'POST',
        url: this.url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': this.accessKey,
          'x-ncp-apigw-timestamp': timestamp,
          'x-ncp-apigw-signature-v2': signature,
        },
        data: {
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
      });

      if (response.status === 202) {
        return {
          success: true,
          status: response.status,
          msg: response.statusText,
        };
      } else {
        return {
          success: false,
          status: response.status,
          msg: response.statusText,
        };
      }
    } catch (error) {
      return {
        success: false,
        msg: error.response.statusText || 'Internal Server Error',
        status: error.response.status || 500,
      };
    }
  }

  /**
   *
   * API 시그니처를 생성하는 함수
   *
   * @returns timestamp(string), signature(string)
   */
  private prepareSignature(): prepareSignatureReturnType {
    const space = ' ';
    const newLine = '\n';
    const message = [];
    const hmac = crypto.createHmac('sha256', this.secretKey);
    const url2 = `/sms/v2/services/${this.serviceId}/messages`;
    const timestamp = Date.now().toString();

    message.push(this.method);
    message.push(space);
    message.push(url2);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(this.accessKey);

    return {
      timestamp,
      signature: hmac.update(message.join('')).digest('base64')
    };
  }
}
