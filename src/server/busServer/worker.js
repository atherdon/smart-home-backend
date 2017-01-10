/* @flow */

/* Websocket worker for Bus + Fermenter communication */
import R from 'ramda';
import K from 'kefir';

function run(worker: any) {
  console.log('   >> Worker PID:', process.pid);

  //   const environment = worker.options.environment; // e.g. 'dev'
  const scServer = worker.scServer;

  const logRequest = type => console.log(`[ws-worker] Got <${type}> request from client`);

  worker.on('masterMessage', (streams) => {
    const {busEvents, busState} = streams;

    console.log('~~~~~~~ Logging global bus-state ~~~~~~~');
    console.log(busState);
    busState.log();
  });

  worker.sendToMaster({type: 'BUS_STATE_AND_STREAM_REQ'});

  scServer.on('connection', (socket) => {
    console.info('[ws-worker] - a client connected!');

    const reqStreams = [];

    // 1. KNX-Events - Create a stream triggered by bus-events that emits knx-event to a channel.
    const knxEvents$ = {}; /* TODO */
    // 2. InitialState - Create a stream that subscribes to initialstate-requests and emits back the initial state.

    const reqInitialstate$ = K.stream((emitter) => {
      socket.on('initialstate', (data) => {
        logRequest('initialstate');
        emitter.emit({type: 'INITIALSTATE_REQ', payload: data});
      });
    });

    socket.on('disconnect', () => {
      console.log(`<<< Client ${socket.remoteAddress} disconnected!`);
    });
  });
}

/* SocketCluster expects a named export here */
export {run}; // eslint-disable-line import/prefer-default-export
