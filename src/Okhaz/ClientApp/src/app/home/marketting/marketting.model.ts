export interface CodeValueModel {
    code: string;
    value: boolean;
}

export class WheelModel {
    id: string = '';
    name: string = '';
    textColor: string = '';
    bgColor: string = '';
    image?: any;
    status: boolean = true;
}

export class WheelConfigModel {
    textSize: number = 10;
    repeat: number = 1;
    spinTime: number = 1;
    fairMode: boolean = true;
    segment: string = '';
    height: string = '200';
    width: string = '200';
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