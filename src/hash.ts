import {Md5} from 'ts-md5'

export function hash(data: any): string  {
    if (typeof data === 'number')
        return '' + data;
    return Md5.hashStr(JSON.stringify(data), false)
}
