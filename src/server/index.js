/* @flow */
/* eslint no-console: "off" */
import type { ServerProps } from '../types';
import busServer from './busServer';

function server(props: ServerProps) {
  //   const {conf, streams} = props;
  busServer(props);
  console.info('==> ✅ Server started');
}

export default server;
