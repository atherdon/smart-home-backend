import {readGroupAddr} from '../knx/performBusAction';
import Kefir from 'kefir';

export default function scanBusAddr(addresses) {

  const scanner = Kefir.sequentially(1000, addresses)
                       .map(addr => readGroupAddr(addr));
  scanner.onValue(() => {});
  // scanner.log();
}
