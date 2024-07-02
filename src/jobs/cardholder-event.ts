import { Job } from "@hokify/agenda";
import { AgendaJob } from "./agenda-job";
import Logger from "../lib/logger";

const cardholderEventJob = new AgendaJob(
    'cardholderEventJob',
    '10 seconds',
    (agendaJob: Job<any>) => {
        Logger.info(`Agenda job testing, job name = 'cardholderEventJob' at ${Date.now()}`)
    }
)

export default cardholderEventJob