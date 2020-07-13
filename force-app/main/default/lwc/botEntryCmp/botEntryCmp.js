import { LightningElement, track } from 'lwc';

import BaseChatMessage from 'lightningsnapin/baseChatMessage';
//import { searchRequest } from 'c/searchRequest';

const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];

export default class BotEntryCmp extends BaseChatMessage
{
    @track strMessage = '';

    //Add a var to track visibility for the component
    @track isBaseTextVisible = false;
    @track searchRequest = false;
    @track searchResponse = false;

    connectedCallback() 
    {
        //Set message string
        this.strMessage = this.messageContent.value;
        console.debug('this.userType=' + this.userType);
        console.debug('this.strMessage=' + this.strMessage);

        if (this.isSupportedUserType(this.userType)) 
        {
            if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:searchRequest'))
            {
                this.searchRequest = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:searchResponse'))
            {
                this.searchResponse = true;
            }
                else if (!this.messageContent.value.startsWith('lwc:hide'))
            {
                this.isBaseTextVisible = true;
                this.messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
            }
        } 
        else
        {
            throw new Error('Unsupported user type passed in: ${this.userType}');
        }
    }

    isSupportedUserType(userType) 
    {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    handlePostMessage(event) 
    {
        const val = event.detail;
        console.log('handlePostMessage with value: ' + val);
        window.postMessage(
            {
                message: val,
                type: "chasitor.sendMessage"
            },
            window.parent.location.href
        );
        console.log('handlePostMessage done');
    }
}