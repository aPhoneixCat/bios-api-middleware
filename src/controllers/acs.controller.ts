import { Get, Post, Body, Path, Route, Tags, Delete, Controller, Patch, Query, Produces } from 'tsoa';
import {
	AddCardToCardholderRequest,
	CreateCardholderRequest,
	RefreshCardholderCardRequest
} from '../domain/dtos/acs';
import ACSService from '../services/acs.services';
import { CardEntity, CardholderEntity } from '../domain/entities/cardholder';
import { provideSingleton } from '../utils/provideSingleton';
import { inject } from 'inversify/lib/annotation/inject';
import { HttpCode } from '../constants';
import { IResponse, SuccessResponse } from '../domain/dtos/utils';
import { Floor } from '../config/floors';

@Route('acs')
@Tags('ACS')
@Produces('application/json')
@provideSingleton(ACSController)
export class ACSController extends Controller {
	
	// Dependency Injection
	constructor(@inject(ACSService) private acsService: ACSService) {
		super();
	}

	/**
	 * Retrives the details of an existing cardholder.
	 *
	 * @param cardholderId Supply the unique cardholdr ID
	 * @returns Cardholder details
	 */
	@Get('/cardholders/{cardholderId}')
	public async getCardholder(@Path() cardholderId: string): Promise<IResponse> {
		const cardholderDetail = await this.acsService.getCardholder(cardholderId);
		return SuccessResponse('successfully get cardholder details', cardholderDetail);
	}

	/**
	 * Create new cardholder, and optionally add new card
	 *
	 * @param reqB request body to add cardholder
	 * @returns
	 */
	@Post('/cardholders')
	public async createCardholder(@Body() reqB: CreateCardholderRequest): Promise<IResponse> {
		var cardEntity;
		if (reqB.card2Add) {
			cardEntity = new CardEntity(
				reqB.card2Add?.cardNumber,
				reqB.card2Add?.fromInMs,
				reqB.card2Add?.validityPeriodInMs
			);
		}

		const cardholder = new CardholderEntity(
			reqB.userType, reqB.userName, reqB.floor, reqB.authorised, cardEntity || undefined);
		const createCardholderResponse = await this.acsService.createCardholder(cardholder);

		this.setStatus(HttpCode.CREATED);
		return SuccessResponse('Successfully create cardholder', createCardholderResponse);
	}

	/**
	 * Refresh card in cardholder
	 *
	 * @param cardholderId path variable with unique cardholder ID
	 * @param reqB request body to refresh card in cardholder
	 */
	@Patch('/cardholders/{cardholderId}/refresh')
	public async refreshCardholder(
		@Path() cardholderId: string,
		@Body() reqB: RefreshCardholderCardRequest
	): Promise<IResponse> {
		const cardInfo = new CardEntity(reqB.card2Add.cardNumber, reqB.card2Add.fromInMs, reqB.card2Add.validityPeriodInMs);
		const updateResponse = await this.acsService.refreshCardInCardholder(cardholderId, reqB.existingCardId, cardInfo);

		return SuccessResponse('Successfully update cardholder', updateResponse);
	}

	/**
	 * Delete existing cardholder
	 *
	 * @param cardholderId Path variable of unique cardholder ID
	 */
	@Delete('/cardholders/{cardholderId}')
	public async removeCardholder(@Path() cardholderId: string): Promise<IResponse> {
		await this.acsService.removeCardholder(cardholderId);
		return SuccessResponse('Successfully delete cardholder');
	}

	/**
	 * Activate/Deactivate existing cardholder
	 *
	 * @param cardholderId Path variable of unique existing cardholder
	 * @param authorised Query parameter of boolean flag to activate (True)/de-activate(False)
	 * @returns
	 */
	@Get('/cardholders/{cardholderId}/activate')
	public async activateCardholder(@Path() cardholderId: string, @Query() authorised: boolean): Promise<IResponse> {
		await this.acsService.authoriseCardholder(cardholderId, authorised);
		return SuccessResponse(`Successfully ${authorised ? 'activate' : 'deactivate'} cardholder`);
	}

	/**
	 * Add new card to existing cardholder
	 *
	 * @param cardholderId Path variables of unique cardholder ID
	 * @param reqB request body to add new card
	 * @returns
	 */
	@Post('/cardholders/{cardholderId}/cards')
	public async addCard2Cardholder(
		@Path() cardholderId: string,
		@Body() reqB: AddCardToCardholderRequest
	): Promise<IResponse> {
		const cardInfo = new CardEntity(reqB.cardNumber, reqB.validityPeriodInMs, reqB.fromInMs);

		await this.acsService.addCard2Cardholder(cardholderId, cardInfo.getCard());
		return SuccessResponse('Successfully add card to cardholder');
	}

	/**
	 * Remove existing card from existing cardholder
	 *
	 * @param cardholderId Path variable of unique existing cardholder ID
	 * @param cardId Path variable of existing card ID
	 * @returns
	 */
	@Delete('/cardholders/{cardholderId}/cards/{cardId}')
	public async removeCardFromCardholder(@Path() cardholderId: string, @Path() cardId: string): Promise<IResponse> {
		await this.acsService.removeCardFromCardholder(cardholderId, cardId);
		return SuccessResponse('Successfully remove card from cardholder');
	}
}
