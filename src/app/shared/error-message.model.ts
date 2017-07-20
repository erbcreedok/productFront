import {Response} from '@angular/http';
export class ErrorMessage {

    get header(): string {
        return this._header;
    }
    set header(value: string) {
        this._header = value;
    }
    get body(): string {
        return this._body;
    }
    set body(value: string) {
        this._body = value;
    }
    get error(): Response {
        return this._error;
    }
    set error(value: Response) {
        this._error = value;
    }
    constructor(
        private _header: string,
        private _body: string,
        private _error: Response
    ) {}
}
