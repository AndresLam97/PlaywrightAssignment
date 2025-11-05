import { Page } from "playwright/test";
import * as cons from "../constants/WaitForConstants";

export class StaticUtility{

    static async waitForSelectorByState (page: Page, elementLocator: string, state: cons.WaitForSelectorStates, timeout = 5000, options?:{isAwait?:boolean}): Promise<void>{
        const {isAwait = true} = options || {};
        if(isAwait){
            await page.waitForSelector(elementLocator, {state: state, timeout: timeout});
        }else{
            page.waitForSelector(elementLocator, {state: state, timeout: timeout});
        }
    }

    static async waitForSelectorByTimeout(page: Page, elementLocator: string , timeout: number, options?:{isAwait?: boolean}): Promise<void>{
        const {isAwait = true} = options || {};
        if(isAwait){
            await page.waitForSelector(elementLocator, {timeout: timeout});
        } else{
            page.waitForSelector(elementLocator, {timeout: timeout});
        }
    }

    static async waitForEvent(page: Page, event: cons.WaitForEventStates, options?: {isAwait?: boolean}): Promise<any>{
        const {isAwait = true} = options || {};
        if(isAwait){
            return await page.waitForEvent(event as Parameters<Page['waitForEvent']>[0], {timeout: 5000});
        }
        else{
            return page.waitForEvent(event as Parameters<Page['waitForEvent']>[0], {timeout: 5000});
        }
    }

}