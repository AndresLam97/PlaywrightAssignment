import { WaitForEventStates, WaitForSelectorStates } from '../constants/WaitForConstants';
import { KeyPress } from '../constants/KeyboardConstants';
import { StaticUtility } from './StaticUtility';
import { Download, Page } from "playwright";
import { DialogActions } from '../constants/DialogActions';
import { DateFormats } from '../constants/DateFormats';
import { Separators } from '../constants/Separators';
import { Logger } from '../utilities/Logger';
import { DateUtility } from './DateUtility';

export class AppActions {
    page: Page;

    // Constuctor
    constructor(page: Page) {
        this.page = page;
    }

    // Click and press actions
    public async clickOnElement(elementLocator: string, options?: { timeout?: number, isAwait?: boolean }): Promise<void> {
        const { timeout = 5000, isAwait = true } = options || {};
        try {
            if (isAwait) {
                StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE, timeout);
                await this.page.click(elementLocator);
            }
            else {
                this.page.click(elementLocator);
            }
        } catch (error) {
            Logger.error(`Unable to click on button with locator ${elementLocator}`);
            throw error;
        }
    }

    public async pressOnButton(elementLocator: string, key: KeyPress, timeout: number = 5000): Promise<void> {
        try {
            StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE, timeout);
            await this.page.press(elementLocator, key);
        } catch (error) {
            Logger.error(`Unable to press on element (locator ${elementLocator}) with ${key} key press`);
            throw error;
        }

    }

    // Drag and drop
    public async dragToElement(originLocator: string, destinationLocator: string) {
        try {
            StaticUtility.waitForSelectorByState(this.page, originLocator, WaitForSelectorStates.VISIBLE);
            StaticUtility.waitForSelectorByState(this.page, destinationLocator, WaitForSelectorStates.VISIBLE);
            const originElement = await this.page.locator(originLocator);
            const destinationElement = await this.page.locator(destinationLocator);
            await originElement.dragTo(destinationElement);
        } catch (error) {
            Logger.error(`Unable to drag on element (locator ${originLocator}) to element (locator ${destinationLocator})`);
            throw error;
        }
    }

    // Type and fill actions
    public async typeOnInput(elementLocator: string, text: string, options?: { clear?: boolean, delayTime?: number }): Promise<void> {
        const { clear = false, delayTime = 200 } = options || {};
        try {
            StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE);
            if (clear) {
                await this.page.fill(elementLocator, '');
            }
            await this.page.type(elementLocator, text, { delay: delayTime });
        } catch (error) {
            Logger.error(`Unable to type on input field with locator ${elementLocator}`);
            throw error;
        }
    }

    public async fillOnInput(elementLocator: string, text: string): Promise<void> {
        try {
            StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE);
            await this.page.type(elementLocator, text);
        } catch (error) {
            Logger.error(`Unable to fill on input field with locator ${elementLocator}`);
            throw error;
        }
    }

    // File upload and download 
    public async downloadFile(elementLocator: string, filePath: string): Promise<void> {
        try {
            StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE);
            const [file] = await Promise.all([
                StaticUtility.waitForEvent(this.page, WaitForEventStates.DOWNLOAD, { isAwait: false }),
                this.clickOnElement(elementLocator, { isAwait: false })
            ]);
            const download = file as Download;
            await file.saveAs(filePath);
        } catch (error) {
            Logger.error(`Unable to download file and save to file path ${filePath}`);
            throw error;
        }
    }

    public async uploadFileDirectly(elementLocator: string, fileList: string[]): Promise<void> {
        try {
            StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE);
            await this.page.setInputFiles(elementLocator, fileList);
        } catch (error) {
            Logger.error(`Unable to upload file (file list ${JSON.stringify(fileList)})`);
            throw error;
        }
    }

    public async uploadFileWithFileChooser(elementLocator: string, fileList: string[]): Promise<void> {
        try {
            StaticUtility.waitForSelectorByState(this.page, elementLocator, WaitForSelectorStates.VISIBLE);
            const [upload] = await Promise.all([
                StaticUtility.waitForEvent(this.page, WaitForEventStates.FILE_CHOOSER, { isAwait: false }),
                this.clickOnElement(elementLocator, { isAwait: false })
            ]);
            upload.setFiles(fileList);
        } catch (error) {
            Logger.error(`Unable to upload file (file list ${JSON.stringify(fileList)})`);
            throw error;
        }
    }

    // Datepicker
    public async inputToDatePicker(elementLocator: string, day: number, month: number, year: number, dateFormat: DateFormats, separator: Separators): Promise<void> {
        try {
            DateUtility.validateDate(day, month, year);
            var formattedDate: string;
            switch (dateFormat) {
                case DateFormats.DAY_MONTH_HALF_YEAR:
                    formattedDate = `${day.toString()}${separator}${month.toString()}${separator}${year.toString().substring((year.toString()).length / 2, (year.toString()).length)}`;
                    break;
                case DateFormats.DAY_MONTH_YEAR:
                    formattedDate = `${day.toString()}${separator}${month.toString()}${separator}${year.toString()}`;
                    break;
                case DateFormats.HALF_YEAR_DAY_MONTH:
                    formattedDate = `${year.toString().substring((year.toString()).length / 2, (year.toString()).length)}${separator}${day.toString()}${separator}${month.toString()}`;
                    break;
                case DateFormats.YEAR_DAY_MONTH:
                    formattedDate = `${year.toString()}${separator}${day.toString()}${separator}${month.toString()}`;
                    break;
                case DateFormats.MONTH_DAY_HALF_YEAR:
                    formattedDate = `${month.toString()}${separator}${day.toString()}${separator}${year.toString().substring((year.toString()).length / 2, (year.toString()).length)}`;
                    break;
                case DateFormats.MONTH_DAY_YEAR:
                    formattedDate = `${month.toString()}${separator}${day.toString()}${separator}${year.toString()}`;
                    break;
                default:
                    formattedDate = "";
            }
            this.fillOnInput(elementLocator, formattedDate);
        } catch (error) {
            Logger.error(`Unable to add date to datepicker with locator ${elementLocator}`);
            throw error;
        }
    }

    public async selectDateFromDatePicker(): Promise<void> { }

    // Dialog handle
    public async dialogSelect(elementLocator: string, options?: { action?: DialogActions, isPrompt?: boolean, promptMessage?: string }): Promise<any> {
        const { action = DialogActions.ACCEPT, isPrompt = false, promptMessage = "" } = options || {};
        try {
            const [dialog] = await Promise.all([
                StaticUtility.waitForEvent(this.page, WaitForEventStates.DIALOG, { isAwait: false }),
                this.clickOnElement(elementLocator, { isAwait: false })
            ]);

            var dialogInfo: {} = {
                type: dialog.type(),
                message: dialog.message(),
                defaultValue: dialog.defaultValue()
            };

            this.page.on("dialog", async (dialog) => {
                if (isPrompt && action === DialogActions.ACCEPT) {
                    await dialog.accept(promptMessage);
                } else if (action === DialogActions.ACCEPT) {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }
            })

        } catch (error) {
            Logger.error(`Unable to work with dialog, button locator ${elementLocator}`);
            throw error;
        }

        return dialogInfo;
    }







}