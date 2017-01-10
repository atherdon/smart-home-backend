/* @flow */
import deepstream from 'deepstream.io-client-js';

/* TODO */
// import handleEvents from './handleEvents';
// import handleInitialState from './handleInitialState';

/* TODO: Refactor */
// import handleIncomingFermenterState from './handleIncomingFermenterState';
// import handleOutgoingFermenterState from './handleOutgoingFermenterState';
//
// import handleIncomingFermenterCommands from './handleIncomingFermenterCommands';
// import handleOutgoingFermenterCommands from './handleOutgoingFermenterCommands';

/* TODO */
// import handleBusWrites from './handleBusWrites';

function busServer(props) {
  const {conf} = props;
  const {busEvents, busState} = props.streams;

  const client = deepstream(`${conf.host}:${conf.port}`).login({username: conf.user}, (success, data) => {
    if (success) {
      /* Provide initial bus-state */
      const smState = client.record.getRecord('busState');
      smState.whenReady((bs) => {
        busState.take(1).onValue((v) => {
          bs.set(v.toJS());
        });
      });

      const sendBusEvent = (event) => {
        console.log('[busServer] Sending out bus event.');
        client.event.emit('knx/event', event);
      };

      /* PENDING: smart-home-app is not yet ready to dynamically sub-/unsub to KNX-events: */
      client.event.listen('knx/event', (eventName, isSubscribed, response) => {
        console.log(`[knx-event-handler] Someone subscribed to <${eventName}>: ${isSubscribed}`);
        if (isSubscribed) {
          response.accept();
          busEvents.onValue(sendBusEvent);
        } else {
          //           response.reject();
          busEvents.offValue(sendBusEvent);
        }
      });
    } else {
      /* login failed or no connection */
      console.error('Login to network failed :(');
    }
  });

  /* Setup event-handlers for all the streams we've got: */

  /* TODO: Refactor */
  /* TODO: Should refactor common functions inside these handlers like
     #createRequestStream, #sendState or #errorHandler */
  // handleEvents(io, busEvents);
  // handleInitialState(io, busState);

/* TODO: Refactor */
  /* Handle in- and out-going fermenter state (streams) */
// const incomingFermenterState = handleIncomingFermenterState(io);
// handleOutgoingFermenterState(io, incomingFermenterState);

  /* Handle in- and out-going fermenter commands (streams) */
// const incomingFermenterCommands = handleIncomingFermenterCommands(io);
// handleOutgoingFermenterCommands(io, incomingFermenterCommands);

  /* Send received bus-write-request to the bus (without ACK, since the
     bus-write-event will be send to the client anyways) */
  //   handleBusWrites(io);
}

export default busServer;
