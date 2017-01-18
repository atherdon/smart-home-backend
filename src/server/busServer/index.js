/* @flow */

import type { Config, BusState, BusEvent } from '../../types';
import type {Observable} from 'kefir';

import deepstream from 'deepstream.io-client-js';
import K from 'kefir';

/* TODO */
// import handleEvents from './handleEvents';
// import handleInitialState from './handleInitialState';

/* TODO: Refactor */
// import handleIncomingFermenterState from './handleIncomingFermenterState';
// import handleOutgoingFermenterState from './handleOutgoingFermenterState';
//
// import handleIncomingFermenterCommands from './handleIncomingFermenterCommands';
// import handleOutgoingFermenterCommands from './handleOutgoingFermenterCommands';

import handleBusWrites from './handleBusWrites';
import handleBusEvents from './handleBusEvents';

type Props = {
  conf: Config,
  streams: {
    busEvents: BusEvent,
    busState: BusState,
  },
};

function busServer(props: Props) {
  const {wsServer} = props.conf;
  const {busEvents, busState} = props.streams;

  const connectClient$ = K.fromPromise(new Promise((resolve, reject) => {
    const client = deepstream(`${wsServer.host}:${wsServer.port}`).login({username: wsServer.user}, (success, data) => {
      if (success) {
        resolve(client)
      } else {
        reject(new Error('Failed to connect to deepstream-server!'));
      }
    });
  }));

  /* Handles initial-bus-state requests */
  const updateRemoteInitialState = (client) => {
    const smState = client.record.getRecord('busState');
    smState.whenReady((bs) => {
      busState.onValue((v) => {
        console.log('[busServer] Setting initial bus-state on deepstream-server');
        bs.set(v.toJS());
      })
    })
  };


  /* Setup event-handlers for all bus-events / streams we've got: */
  const deepstreamService$ = connectClient$.observe({
    value(client) {
      updateRemoteInitialState(client);
      handleBusWrites(client);
      handleBusEvents(client, busEvents);
    },
    error(error) {
      console.error(`[busServer] Connection error to deepstream-server occured:`);
      console.error(error);
    },
    end() {
      console.log(`[busServer] deepstream-server connection done.`);
    }
  });

  /* TODO: When is this happening?! */
  //   deepstreamService$.unsubscribe();

/* TODO: Refactor */
  /* Handle in- and out-going fermenter state (streams) */
// const incomingFermenterState = handleIncomingFermenterState(io);
// handleOutgoingFermenterState(io, incomingFermenterState);

  /* Handle in- and out-going fermenter commands (streams) */
// const incomingFermenterCommands = handleIncomingFermenterCommands(io);
// handleOutgoingFermenterCommands(io, incomingFermenterCommands);

}

export default busServer;
