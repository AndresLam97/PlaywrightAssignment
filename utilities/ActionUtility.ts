import { WaitForEventStates, WaitForSelectorStates } from '../constants/WaitForConstants';
import { KeyPress } from '../constants/KeyboardConstants';
import { StaticUtility } from './StaticUtility';
import { Download, Page } from "playwright";

export class AppActions{
    page: Page;

    // Constuctor
    constructor(page: Page)
    {
        this.page = page;
    }

    // Click and press actions
    public async clickOnElement(elementLocator: string, options?: {timeout?: number,isAwait?: boolean}): Promise<void>{
        const {timeout = 5000, isAwait = true} = options || {};
        if(isAwait){
            StaticUtility.waitForSelectorByState(this.page,elementLocator,WaitForSelectorStates.VISIBLE, timeout);
            await this.page.click(elementLocator);
        }
        else{
            this.page.click(elementLocator);
        }
    }

    public async pressOnButton(elementLocator: string, key: KeyPress ,timeout: number = 5000): Promise<void>{
        StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE, timeout);
        await this.page.press(elementLocator, key);
    }

    // Drag and drop
    public async dragToElement(originLocator: string, destinationLocator: string){
        StaticUtility.waitForSelectorByState(this.page,originLocator, WaitForSelectorStates.VISIBLE);
        StaticUtility.waitForSelectorByState(this.page,destinationLocator, WaitForSelectorStates.VISIBLE);
        const originElement = await this.page.locator(originLocator);
        const destinationElement = await this.page.locator(destinationLocator);
        await originElement.dragTo(destinationElement);
    }

    // Type and fill actions
    public async typeOnInput(elementLocator: string, text: string, options?: {clear?: boolean, delayTime?: number}): Promise<void>{
        const {clear = false, delayTime = 200} = options || {};
        StaticUtility.waitForSelectorByState(this.page,elementLocator,WaitForSelectorStates.VISIBLE);
        if(clear) {
            await this.page.fill(elementLocator, '');
        }
        await this.page.type(elementLocator,text,{delay: delayTime});
    }

    public async fillOnInput(elementLocator: string, text: string): Promise<void>{
        StaticUtility.waitForSelectorByState(this.page,elementLocator,WaitForSelectorStates.VISIBLE);
        await this.page.type(elementLocator,text);
    }

    // File upload and download 
    public async downloadFile(elementLocator: string, filePath: string): Promise<void>{
        StaticUtility.waitForSelectorByState(this.page,elementLocator,WaitForSelectorStates.VISIBLE);
        const [file] = await Promise.all([
            StaticUtility.waitForEvent(this.page,WaitForEventStates.DOWNLOAD,{isAwait:false}),
            this.clickOnElement(elementLocator,{isAwait: false})
    ]);
        const download = file as Download;
        await file.saveAs(filePath);
    }

    public async uploadFileDirectly(elementLocator: string, ...fileList: string[]): Promise<void>{
        StaticUtility.waitForSelectorByState(this.page,elementLocator,WaitForSelectorStates.VISIBLE);
        await this.page.setInputFiles(elementLocator, fileList);
    }

    public async uploadFileWithFileChooser(elementLocator: string, fileList: string[]): Promise<void>{
        StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE);
        const [upload] = await Promise.all([
            StaticUtility.waitForEvent(this.page,WaitForEventStates.FILE_CHOOSER,{isAwait: false}),
            this.clickOnElement(elementLocator,{isAwait: false})
        ]);
        
        upload.setFiles(fileList);
    }

    // Datepicker
    public async inputToDatePicker(): Promise<void>{}

    public async selectDateFromDatePicker(): Promise<void>{}


    


}