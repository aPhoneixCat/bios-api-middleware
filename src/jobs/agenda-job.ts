import { Agenda, Job } from '@hokify/agenda';
import Logger from '../lib/logger';

export class AgendaJob {
	private readonly name: string;
	private readonly schedule?: string;
	private readonly exec?: (agendaJob: Job<any>) => void;

	constructor(name: string, schedule: string, exec: (agendaJob: Job<any>) => void) {
		this.name = name;
		this.schedule = schedule;
		this.exec = exec;
	}

	public define(agenda: Agenda) {
		if (this.exec) {
			agenda.define(this.name, this.exec);
		} else {
			Logger.warning(`No exec defined for job [${this.name}]`);
		}
	}

	public async runEvery(agenda: Agenda) {
		if (this.schedule) {
            await agenda.every(this.schedule, this.name)
		} else {
			Logger.warning(`No schedule defined for job [${this.name}]`);
		}
	}

	public getName(): string {
		return this.name;
	}

	public getSchedule(): string | undefined {
		return this.schedule;
	}
}
