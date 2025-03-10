/**
 * SAMPLE CODE NOTICE
 *
 * THIS SAMPLE CODE IS MADE AVAILABLE AS IS.  MICROSOFT MAKES NO WARRANTIES, WHETHER EXPRESS OR IMPLIED,
 * OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY OR COMPLETENESS OF RESPONSES, OF RESULTS, OR CONDITIONS OF MERCHANTABILITY.
 * THE ENTIRE RISK OF THE USE OR THE RESULTS FROM THE USE OF THIS SAMPLE CODE REMAINS WITH THE USER.
 * NO TECHNICAL SUPPORT IS PROVIDED.  YOU MAY NOT DISTRIBUTE THIS CODE UNLESS YOU HAVE A LICENSE AGREEMENT WITH MICROSOFT THAT ALLOWS YOU TO DO SO.
 */

import { IPreOpenUrlTriggerOptions, PreOpenUrlTrigger } from "PosApi/Extend/Triggers/ApplicationTriggers";
import { CancelableTriggerResult } from "PosApi/Extend/Triggers/Triggers";

/**
 * Example implementation of a PreOpenUrlTrigger trigger that shows how to open a native app using deep linking.
 */
export default class OpenDeepLinkUrlTrigger extends PreOpenUrlTrigger {
    /**
     * Executes the trigger functionality.
     * @param {IPreOpenUrlTriggerOptions} options The options provided to the trigger.
     * @return {Promise<CancelableTriggerResult<IPreOpenUrlTriggerOptions>>} The cancelable promise.
     */
    public execute(options: IPreOpenUrlTriggerOptions): Promise<CancelableTriggerResult<IPreOpenUrlTriggerOptions>> {
        let deepLinkUrl: URL;
        try {
            // Validate the URL provided in trigger options
            deepLinkUrl = new URL(options.url);

            // Open new window with deep link URL
            window.open(deepLinkUrl);

            this.context.logger.logInformational("Opened deep link " + deepLinkUrl);
        } catch (e) {
            // Log error but do not block execution
            this.context.logger.logError("Unable to open deep link url: " + deepLinkUrl + ". Exception: " + e);           
        }

        // Return a canceled trigger result so that execution stops and another window is not opened through the normal workflow
        return Promise.resolve(new CancelableTriggerResult<IPreOpenUrlTriggerOptions>(true, options));
    }
}
