import { RuckusGuestPassListParameters } from "../domain/dtos/ruckus/guestpass";
import { AppError } from "../errors/custom.error";
import Logger from "../lib/logger";
import RuckusGuestPassAPI from "../lib/ruckus-api/ruckus-guestpass.api";
import { provideSingleton } from "../utils/provideSingleton";

@provideSingleton(RuckusService)
export default class RuckusService {
  
    /**
     * Genrate guest wifi 
     * 
     * @param xxx tbd
     * @returns 
     */
    public async generateGuestPass(): Promise<void> {
        
        const guestPassRes = await RuckusGuestPassAPI.generateGuestPass()

        const searchParams: RuckusGuestPassListParameters =  {

        }
        const guestPassList = await RuckusGuestPassAPI.listGuestPass(searchParams)

    }

    
}
