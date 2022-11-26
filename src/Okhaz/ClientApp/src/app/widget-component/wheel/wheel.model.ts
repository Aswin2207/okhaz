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