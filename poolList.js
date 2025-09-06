import { SarosFarmService } from "@saros-finance/sdk/src/farm/SarosFarmServices.js";

const response = await SarosFarmService.getListPool({page: 1, size: 2});

console.log(response);