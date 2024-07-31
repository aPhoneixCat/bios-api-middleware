import { Agenda } from '@hokify/agenda';
import { envs } from '../config/env';
import { AgendaJob } from '../jobs/agenda-job';
import Logger from './logger';
import cardholderEventJob from '../jobs/cardholder-event';

const connectionString = `${envs.MONGODB_CONNECTION_STR}/${envs.MONGODB_DATABASE}`;
const connectionOpts = { db: { address: connectionString, collection: 'agendaJobs' } };

const agenda = new Agenda(connectionOpts);
// listen for the ready or error event.
agenda
	.on('start', () => console.log('Agenda job started!'))
	.on('complete', () => console.log('Agenda job completed!'))
	.on('success', () => console.log('Agenda job success!'))
	.on('fail', () => console.log('Agenda job fail!'));

// Jobs to run
const jobTypes: AgendaJob[] = [
    cardholderEventJob
];

const runningJobs: AgendaJob[] = [];
jobTypes.forEach(async (job) => {
	job.define(agenda);
	runningJobs.push(job);
});

if (jobTypes.length) {
    agenda.start(); // Returns a promise, which should be handled appropriately
    if (runningJobs) {
        runningJobs.forEach(async (job) => {
            Logger.info(`Runnning job [${job.getName()}] at schedule [${job.getSchedule()}]`);
            await job.runEvery(agenda);
        });
    }
} else {
    Logger.warning('No job types specified, please run JOB_TYPES')
}

export default agenda;
