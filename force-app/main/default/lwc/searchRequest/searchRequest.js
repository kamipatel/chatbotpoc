import { LightningElement, api } from 'lwc';

export default class SearchRequest extends LightningElement {

    @api inputParams;

    handleOk(event)
    {
        this.surveyDisabled = true;
        this.dispatchEvent(new CustomEvent('postmessage',{
            detail: 'searchRequest'
        }));
    }

}