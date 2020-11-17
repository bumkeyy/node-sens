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