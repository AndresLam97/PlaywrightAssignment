import {test} from '@playwright/test';
import { StaticUtility } from '../utilities/StaticUtility';
import { WaitForEventStates } from '../constants/WaitForConstants';
import { AppActions } from '../utilities/ActionUtility';


test("test", async ({page}) => {
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/');

    const action = new AppActions(page);
    const fileList: string[] = ['./asd.png','./asd2.png'];
    action.uploadFileWithFileChooser('//input[@type="file"]',fileList);

    await page.waitForTimeout(10000);
});