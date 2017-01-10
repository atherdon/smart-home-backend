/* eslint no-console: "off" */
import busServer from './busServer';

function server(props) {
  const {conf, streams} = props;

  busServer(props);

  console.info('==> ✅ Server started');
  console.info(`==> 🌎 HomeBus is available on ${conf.port}.`);
}

export default server;
