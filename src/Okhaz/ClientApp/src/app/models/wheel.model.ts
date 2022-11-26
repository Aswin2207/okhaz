export interface CodeValueModel {
    code: string;
    value: boolean;
}

export class WheelModel {
    WGSID: string = '';
    WGlID: number = 1;
    WGSText: string = '';
    WGSTextColorCode: string = '';
    WGSBackGroudColorCode: string = '';
    ImagePath?: any='';
    WGSstatus: number = 1;
}

export class WheelConfigModel {
    textSize: number = 10;
    repeat: number = 1;
    spinTime: number = 1;
    fairMode: boolean = true;
    segment: string = '';
    height: string = '180';
    width: string = '180';
}

export interface WheelActionModel {
    index: number;
    action: string;
    param: Object[];
}

export const ActionItems = {
    ADD: 'add',
    DELETE: 'delete',
    UPDATE: 'update'
}