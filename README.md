# node-sens

[![npm version](https://badge.fury.io/js/node-sens.svg)](https://badge.fury.io/js/node-sens) ![travisci](https://travis-ci.com/Bumkeyy/sens.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/Bumkeyy/sens/badge.svg)](https://coveralls.io/github/Bumkeyy/sens)

Simple &amp; Easy Notification Service client in NAVER CLOUD PLATFORM

![readme](/assets/readme.png)

Naver Cloud Platform에서 제공하는 SENS client 입니다.

## Installation

```sh
npm install node-sens --save
yarn add node-sens
```

## Usage

```typescript
import { NCPClient } from 'node-sens';

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
