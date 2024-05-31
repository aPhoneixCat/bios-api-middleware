/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WIFIController } from './controllers/wifi.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from './controllers/events.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ACSController } from './controllers/acs.controller';
import { iocContainer } from './ioc';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Actitity": {
        "dataType": "refEnum",
        "enums": ["Checkin","Checkout"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventType": {
        "dataType": "refEnum",
        "enums": ["Cardholder_CheckinCheckout"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CardholderCheckinoutEvent": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"dataType":"double","required":true},
            "type": {"ref":"EventType","required":true},
            "message": {"dataType":"string","required":true},
            "cardholderId": {"dataType":"string","required":true},
            "activity": {"ref":"Actitity","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventResponse": {
        "dataType": "refObject",
        "properties": {
            "events": {"dataType":"array","array":{"dataType":"refObject","ref":"CardholderCheckinoutEvent"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessZoneRef": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HrefMixin": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PdfDefinition": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "id": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pdf": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "definition": {"ref":"PdfDefinition","required":true},
            "value": {"ref":"HrefMixin","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PersonalDataDefinition": {
        "dataType": "refObject",
        "properties": {
            "@email": {"ref":"Pdf"},
            "@phone": {"ref":"Pdf"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Status": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CardTypeRef": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Invitation": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "mobile": {"dataType":"string","required":true},
            "singleFactorOnly": {"dataType":"boolean","required":true},
            "status": {"dataType":"string","required":true},
            "href": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Card": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string"},
            "number": {"dataType":"string"},
            "cardSerialNumber": {"dataType":"string"},
            "issueLevel": {"dataType":"double"},
            "status": {"ref":"Status"},
            "type": {"dataType":"union","subSchemas":[{"ref":"CardTypeRef"},{"ref":"HrefMixin"}]},
            "invitation": {"ref":"Invitation"},
            "from": {"dataType":"string"},
            "until": {"dataType":"string"},
            "credentialClass": {"dataType":"string"},
            "trace": {"dataType":"boolean"},
            "lastPrintedOrEncodedTime": {"dataType":"string"},
            "lastPrintedOrEncodedIssueLevel": {"dataType":"double"},
            "pin": {"dataType":"string"},
            "visitorContractor": {"dataType":"boolean"},
            "ownedBySite": {"dataType":"boolean"},
            "credentialId": {"dataType":"string"},
            "bleFacilityId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessGroupRef": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessGroup": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string"},
            "accessGroup": {"ref":"AccessGroupRef"},
            "status": {"ref":"Status"},
            "from": {"dataType":"string"},
            "until": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OperatorGroupRef": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OperatorGroup": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "operatorGroup": {"ref":"OperatorGroupRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CompetencyRef": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Competency": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "competency": {"ref":"CompetencyRef","required":true},
            "status": {"ref":"Status","required":true},
            "expiryWarning": {"dataType":"string","required":true},
            "expiry": {"dataType":"string","required":true},
            "enablement": {"dataType":"string","required":true},
            "comment": {"dataType":"string","required":true},
            "limitedCredit": {"dataType":"boolean","required":true},
            "credit": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Notifications": {
        "dataType": "refObject",
        "properties": {
            "enabled": {"dataType":"boolean","required":true},
            "from": {"dataType":"string","required":true},
            "until": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleRef": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Cardholder": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Relationship": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "role": {"ref":"RoleRef","required":true},
            "cardholder": {"ref":"Cardholder","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Locker": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "locker": {"ref":"AllocatedLocker","required":true},
            "from": {"dataType":"string","required":true},
            "until": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AllocatedLocker": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "shortName": {"dataType":"string","required":true},
            "lockerBank": {"ref":"Locker","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ElevatorGroup": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "elevatorGroup": {"ref":"OperatorGroupRef","required":true},
            "accessZone": {"ref":"AccessZoneRef","required":true},
            "enableCaptureFeatures": {"dataType":"boolean","required":true},
            "enableCodeBlueFeatures": {"dataType":"boolean","required":true},
            "enableExpressFeatures": {"dataType":"boolean","required":true},
            "enableServiceFeatures": {"dataType":"boolean","required":true},
            "enableService2Features": {"dataType":"boolean","required":true},
            "enableService3Features": {"dataType":"boolean","required":true},
            "enableVipFeatures": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OperatorRef": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Redaction": {
        "dataType": "refObject",
        "properties": {
            "href": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "when": {"dataType":"string","required":true},
            "before": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
            "redactionOperator": {"ref":"OperatorRef","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CardholderDetail": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "shortName": {"dataType":"string"},
            "description": {"dataType":"string"},
            "authorised": {"dataType":"boolean","required":true},
            "lastSuccessfulAccessTime": {"dataType":"string"},
            "lastSuccessfulAccessZone": {"ref":"AccessZoneRef"},
            "serverDisplayName": {"dataType":"string"},
            "division": {"ref":"HrefMixin"},
            "@email": {"dataType":"string"},
            "@phone": {"dataType":"string"},
            "personalDataDefinitions": {"dataType":"array","array":{"dataType":"refObject","ref":"PersonalDataDefinition"}},
            "cards": {"dataType":"array","array":{"dataType":"refObject","ref":"Card"}},
            "accessGroups": {"dataType":"array","array":{"dataType":"refObject","ref":"AccessGroup"}},
            "operatorGroups": {"dataType":"array","array":{"dataType":"refObject","ref":"OperatorGroup"}},
            "competencies": {"dataType":"array","array":{"dataType":"refObject","ref":"Competency"}},
            "updateLocation": {"ref":"HrefMixin"},
            "notes": {"dataType":"string"},
            "notifications": {"ref":"Notifications"},
            "relationships": {"dataType":"array","array":{"dataType":"refObject","ref":"Relationship"}},
            "lockers": {"dataType":"array","array":{"dataType":"refObject","ref":"Locker"}},
            "elevatorGroups": {"dataType":"array","array":{"dataType":"refObject","ref":"ElevatorGroup"}},
            "redactions": {"dataType":"array","array":{"dataType":"refObject","ref":"Redaction"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IdentityMixin": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCardholderResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"CardholderDetail"},{"ref":"IdentityMixin"},{"ref":"HrefMixin"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCardholderResponse": {
        "dataType": "refObject",
        "properties": {
            "cardholderId": {"dataType":"string","required":true},
            "card": {"dataType":"nestedObjectLiteral","nestedProperties":{"expiredAt":{"dataType":"double","required":true},"cardId":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserType": {
        "dataType": "refEnum",
        "enums": ["visitor","staff","vip"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddCardToCardholderRequest": {
        "dataType": "refObject",
        "properties": {
            "cardNumber": {"dataType":"string","required":true},
            "fromInMs": {"dataType":"double"},
            "validityPeriodInMs": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCardholderRequest": {
        "dataType": "refObject",
        "properties": {
            "userName": {"dataType":"string","required":true},
            "userType": {"ref":"UserType","required":true},
            "authorised": {"dataType":"boolean"},
            "card2Add": {"ref":"AddCardToCardholderRequest"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCardholderRequest": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/events/live',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getLiveEvents)),

            async function EventController_getLiveEvents(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    eventType: {"in":"query","name":"eventType","required":true,"ref":"EventType"},
                    cardholderIds: {"in":"query","name":"cardholderIds","required":true,"dataType":"array","array":{"dataType":"string"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<EventController>(EventController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getLiveEvents',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/events/reporting',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.reportEvents)),

            async function EventController_reportEvents(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    eventType: {"in":"query","name":"eventType","required":true,"dataType":"string"},
                    cardholderIds: {"in":"query","name":"cardholderIds","required":true,"dataType":"array","array":{"dataType":"string"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<EventController>(EventController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'reportEvents',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/acs/cardholders/:cardholderId',
            ...(fetchMiddlewares<RequestHandler>(ACSController)),
            ...(fetchMiddlewares<RequestHandler>(ACSController.prototype.getCardholder)),

            async function ACSController_getCardholder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cardholderId: {"in":"path","name":"cardholderId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ACSController>(ACSController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getCardholder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/acs/cardholders',
            ...(fetchMiddlewares<RequestHandler>(ACSController)),
            ...(fetchMiddlewares<RequestHandler>(ACSController.prototype.createCardholder)),

            async function ACSController_createCardholder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    reqB: {"in":"body","name":"reqB","required":true,"ref":"CreateCardholderRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ACSController>(ACSController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createCardholder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/acs/cardholers/:cardholderId',
            ...(fetchMiddlewares<RequestHandler>(ACSController)),
            ...(fetchMiddlewares<RequestHandler>(ACSController.prototype.updateCardholder)),

            async function ACSController_updateCardholder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cardholderId: {"in":"path","name":"cardholderId","required":true,"dataType":"string"},
                    reqB: {"in":"body","name":"reqB","required":true,"ref":"UpdateCardholderRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ACSController>(ACSController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'updateCardholder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/acs/cardholders/:cardholderId',
            ...(fetchMiddlewares<RequestHandler>(ACSController)),
            ...(fetchMiddlewares<RequestHandler>(ACSController.prototype.removeCardholder)),

            async function ACSController_removeCardholder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cardholderId: {"in":"path","name":"cardholderId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ACSController>(ACSController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'removeCardholder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/acs/cardholders/:cardholderId/activate',
            ...(fetchMiddlewares<RequestHandler>(ACSController)),
            ...(fetchMiddlewares<RequestHandler>(ACSController.prototype.activateCardholder)),

            async function ACSController_activateCardholder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cardholderId: {"in":"path","name":"cardholderId","required":true,"dataType":"string"},
                    authorised: {"in":"query","name":"authorised","required":true,"dataType":"boolean"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ACSController>(ACSController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'activateCardholder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/acs/cardholders/:cardholderId/cards',
            ...(fetchMiddlewares<RequestHandler>(ACSController)),
            ...(fetchMiddlewares<RequestHandler>(ACSController.prototype.addCard2Cardholder)),

            async function ACSController_addCard2Cardholder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cardholderId: {"in":"path","name":"cardholderId","required":true,"dataType":"string"},
                    reqB: {"in":"body","name":"reqB","required":true,"ref":"AddCardToCardholderRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ACSController>(ACSController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'addCard2Cardholder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/acs/cardholders/:cardholderId/cards/:cardId',
            ...(fetchMiddlewares<RequestHandler>(ACSController)),
            ...(fetchMiddlewares<RequestHandler>(ACSController.prototype.removeCardFromCardholder)),

            async function ACSController_removeCardFromCardholder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cardholderId: {"in":"path","name":"cardholderId","required":true,"dataType":"string"},
                    cardId: {"in":"path","name":"cardId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ACSController>(ACSController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'removeCardFromCardholder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
