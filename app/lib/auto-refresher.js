import Kefir from 'kefir';
import busScanner from './bus-scanner';
import {List} from 'immutable';

const maxRefreshLimit = 5;

function reduceAddressesToIds(addrMap) {
  return addrMap.reduce((lst, addr) => lst.push(addr.get('id')), new List());
}

function refreshStaleAddresses(stream) {

  const timer = Kefir.withInterval(30000, emitter => {
    emitter.emit();
  });

  stream.sampledBy(timer)
        .onValue((addresses) => {
          const now = Date.now();
          const staleAddresses = addresses.filter(addr => (now - addr.get('updatedAt')) / 1000 > 600);

          /* DEBUGGING: */
          console.log(`~~ Addresse-Refresher: We have ${staleAddresses.size} stale addresses - refreshing a max of ${maxRefreshLimit} of these: ${reduceAddressesToIds(staleAddresses).join('|')}`);
          //console.log(staleAddresses.take(5).reduce((lst, addr) => lst.push(addr.get('id')), new List()).toJS());

          busScanner(reduceAddressesToIds(staleAddresses.take(maxRefreshLimit)).toJS());
        })
    //.log()
    ;
}

export default refreshStaleAddresses;
