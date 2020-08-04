# sens

Simple &amp; Easy Notification Service client in NAVER CLOUD PLATFORM

![스크린샷 2020-08-05 오전 2.12.18](/assets/스크린샷%202020-08-05%20오전%202.12.18.png)

Naver Cloud Platform에서 제공하는 SENS client 입니다.

## Installation

```sh
npm install sens --save
yarn add sens
```

## Usage

```typescript
import { NCPClient } from 'sens';

const ncp = new NCPClient({
  phoneNumber: '000-0000-0000',
  serviceId: 'serviceId',
  secretKey: 'secretKey',
  accessKey: 'accessKey',
});
```

- `phoneNumber` : 발신 전화번호
- `serviceId` : 프로젝트의 서비스 id
- `secretKey` : 프로젝트 계정의 secretKey
- `accessKey` : 프로젝트 계정의 accessKey

```typescript
ncp.sendSMS(to:'000-0000-0000', content:'Hello SENS');

ncp.sendSMS(to:'000-0000-0000', content:'Hello SENS', countryCode:'82');
```

- `to` : 수신 전화번호
- `content` : 보낼 내용
- `countryCode`(optional) : 국가 코드 (default : 82)

## Test

```sh
npm run test
```

## CONTRIBUTING

해당 코드에 버그나 이슈는 언제나 환영입니다 :smile:
