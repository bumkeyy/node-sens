# node-sens

[![npm version](https://badge.fury.io/js/node-sens.svg)](https://badge.fury.io/js/node-sens) ![travisci](https://travis-ci.com/Bumkeyy/node-sens.svg?branch=master) ![GitHub Release Date](https://img.shields.io/github/release-date/bumkeyy/Node-sens)

Simple &amp; Easy Notification Service client in NAVER CLOUD PLATFORM

![readme](/assets/readme.png)

Naver Cloud Platform에서 제공하는 SENS client 입니다.

[SMS API v2](https://apidocs.ncloud.com/ko/ai-application-service/sens/sms_v2/)와 sync되어 있습니다.

## Installation

```sh
npm install node-sens --save
yarn add node-sens
```

## Usage

```typescript
import { NCPClient } from 'node-sens';

const ncp = new NCPClient({
  phoneNumber: '01012345678',
  serviceId: 'serviceId',
  secretKey: 'secretKey',
  accessKey: 'accessKey',
});
```

#### Parameter Type

- `phoneNumber` (string): 발신 전화번호
- `serviceId` (string): 프로젝트의 서비스 id
- `secretKey` (string): 프로젝트 계정의 secretKey
- `accessKey` (string): 프로젝트 계정의 accessKey

```typescript
const { success, msg, status } = await ncp.sendSMS({
  to: '01012345678',
  content: 'Hello SENS',
});

const { success, msg, status } = await ncp.sendSMS({
  to: '01012345678',
  content: 'Hello SENS',
  countryCode: '82',
});
```

#### Parameter Type

- `to` (string): 수신 전화번호
- `content` (string): 보낼 내용
- `countryCode`(optional) : 국가 코드 (default : 82)

#### Return Type

- `promise` : `promise`를 반환합니다.

PromiseReturnType:  
- `success` (boolean) : `true`시 성공, `false`시 실패
- `msg` (string) : 성공시 `Accepted`, 실패시 `error message`
- `status` (number) : status code

## Status Code

| HTTP Status |         Desc          |
| :---------: | :-------------------: |
|     202     |  Accept (요청 완료)   |
|     400     |      Bad Request      |
|     401     |     Unauthorized      |
|     403     |       Forbidden       |
|     404     |       Not Found       |
|     429     |   Too Many Requests   |
|     500     | Internal Server Error |

## Test

```sh
npm run test
```

## CONTRIBUTING

해당 코드에 버그나 이슈는 언제나 환영입니다 :smile:
