import K from 'kefir';
import {EventEmitter} from 'events';
import {assoc, compose} from 'ramda';
import dispatch from './taskDispatcher';
import {scheduledJobIds, runningJobIds} from './util';

const eventEmitter = new EventEmitter();

function createTaskEventStream() {
  const startedEvents$ = K.fromEvents(eventEmitter, 'taskStarted');
  const endedEvents$ = K.fromEvents(eventEmitter, 'taskEnded');

  /* Create task-event-stream that returns task-events as they finished running */
  return K.merge([startedEvents$, endedEvents$]).toProperty(() => {});
}

/* Taskrunner: What a task is actually doing - your sideeffects go here! */
function runTask(task, callback) {
  /* PENDING: Simulated fake async operation */
  console.log(`Started task ${JSON.stringify(task)}...`);
  eventEmitter.emit('taskStarted', task);

  setTimeout(() => {
    //     console.log(`Completed task ${JSON.stringify(task)}.`);
    const end = compose(assoc('endedAt', Date.now()), assoc('status', 'ended'));

    callback(null, end(task));
  }, 500);
}

/* Cron side-effects routine */
function processTaskEvents() {
  return ({crontab}) => {
    console.log(`[onValue] Job(s) <${scheduledJobIds(crontab)}> scheduled.`);
    console.log(`[onValue] Job(s) <${runningJobIds(crontab)}> running.`);

    const event$ = dispatch(crontab);

    event$.onValue(
      (taskState) => {
        console.log(`[taskEvents$] ${JSON.stringify(taskState)}`); eventEmitter.emit('taskEnded', taskState);
      }
    );
  };
}

export {createTaskEventStream, processTaskEvents, runTask};
