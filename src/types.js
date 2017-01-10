// @flow

export type Address = {
  id: string,
  name: string,
  room: ?string,
  story: ?string,
  type: ?string,
  func: ?string,
};

export type AddressList = Array<Address>;

export type Config = {
  server: {
    port: string,
  },
  knxd: {
    host: string,
    port: string,
    isAvailable: true
  },
  wsServer: {
    host: string,
    port: string,
    user: string,
  },
  commands: {
    simulate: boolean,
  },
  logging: {
    logBusStateOnEvent: boolean,
    logBusEvents: boolean,
  },
  knx: {
    addresses: AddressList,
    addressMap: () => {},
    readableAddr: Array<string>,
  }
};
