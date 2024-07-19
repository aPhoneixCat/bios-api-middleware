import { Get, Post, Body, Path, Route, Tags, Delete, Controller, Patch, Query, Produces } from 'tsoa';
import { provideSingleton } from '../utils/provideSingleton';
import { inject } from 'inversify/lib/annotation/inject';
import { HttpCode } from '../constants';
import { IResponse, SuccessResponse } from '../domain/dtos/utils';
import RuckusService from '../services/ruckus.services';
import { GenerateGuestPassRequest } from '../domain/dtos/ruckus';

@Route('ruckus')
@Tags('ruckus')
@Produces('application/json')
@provideSingleton(RuckusController)
export class RuckusController extends Controller {
	
	// Dependency Injection
	constructor(@inject(RuckusService) private ruckusService: RuckusService) {
		super();
	}

	/**
	 * Generate guest pass
	 *
	 * @param cardholderId Supply the unique cardholdr ID
	 * @returns Guest details
	 */
	@Post('/ruckus/guestpass')
	public async generateGuestPass(@Body() reqB: GenerateGuestPassRequest): Promise<IResponse> {
		const res = await this.ruckusService.generateGuestPass();

		return SuccessResponse('successfully generate guest pass', undefined);
	}

}
