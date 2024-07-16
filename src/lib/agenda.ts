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

const jobTypes: string[] = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];
const jobs: AgendaJob[] = [];
jobTypes.forEach(async (type) => {
	// Logger.info(`Define job [${type}]`);
    // const { default: agendaJob } = await import(`../jobs/${type}`)
    // Logger.info(`agendaJob = ${agendaJob}`)
    const agendaJob = cardholderEventJob
	cardholderEventJob.define(agenda);
	jobs.push(agendaJob);
});

if (jobTypes.length) {
    agenda.start(); // Returns a promise, which should be handled appropriately
    if (jobs) {
        jobs.forEach(async (job) => {
            Logger.info(`Runnning job [${job.getName()}] at schedule [${job.getSchedule()}]`);
            await job.runEvery(agenda);
        });
    }
} else {
    Logger.warning('No job types specified, please run JOB_TYPES')
}

export default agenda;
