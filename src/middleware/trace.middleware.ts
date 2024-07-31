import { type Response, type NextFunction, type Request } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidv4 } from 'uuid';

export interface ITraceId {
	traceId: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<ITraceId>();

export class TraceMiddleware {
	public static readonly handleTrace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const traceId = req.headers['X-Tracing-Id'] ?? uuidv4();
		await asyncLocalStorage.run({ traceId } as ITraceId, async () => {
			return next();
		});
	};
}
