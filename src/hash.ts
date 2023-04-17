import {Md5} from 'ts-md5'

export function hash(obj: Object): string  {
    return Md5.hashStr(JSON.stringify(obj), false)
}
