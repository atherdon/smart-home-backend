import config from './config';
import {List} from 'immutable';

import Kefir from 'kefir';

import knxListener from './knx';

export default function createBusStreams() {

  const {addressMap, readableAddr} = config.knx;

  /* Takes the current bus-state and an event, applies the changes the event
     implies and returns the new bus-state */
  function updateFromEvent(currentState, event) {
    const addrId = event.dest;

    /* DEBUGGING */
    console.log(`Updateing state for addr ${addrId} from ${currentState.get(addrId)} to ${event.value}`);

    if (!currentState.has(addrId)) {
      console.warn(`No matching address found for key ${addrId} - ignoring!`);
      return currentState;
    }

    return currentState.update(event.dest, addr => addr.set('value', event.value));
  };

  /* From all groupaddresses, returns only those with a readable-flag set (see
     config.knx.readableAddr) */
  function initialStateWithReadableAddr(addresses) {
    const addressFilter = new List(readableAddr);

    return addresses
             .filter((v,k) => addressFilter.contains(k));
  }

  const initialstate = initialStateWithReadableAddr(addressMap()),
        mutatingEvents = new List(['write', 'response']);

  /* Create BUS-state */
  /* 1. Create stream to capture *all* KNX-bus events */
  const busEvents = Kefir.stream((emitter) => knxListener(emitter));

  /* 2. Create another (sub-) stream only for events that carry a value, i.e. mutate our bus-state */
  const mutatingBusEvents = busEvents.filter(e => mutatingEvents.contains(e.action));

  /* 3. Create a modified (property-) stream derived from busState by applying an
     event-delta when events come in from the bus-events-stream.
     This reflects our bus-state changing over time.
   */
  const busState = mutatingBusEvents.scan(updateFromEvent, initialstate);

  /* for DEBUGGING: Also locally log each KNX-bus event to the console */
  if (config.logging.logBusEvents)
    busEvents.log();

  if (config.logging.logBusStateOnEvent)
    busState.log();

  return {
    busEvents: busEvents,
    busState: busState
  };
}
