export class Product {

    private static _columns: {name: string, title: string, type: string}[] = [
        {name: 'productCode', title: 'Code', type: 'string'},
        {name: 'productName', title: 'Name', type: 'string'},
        {name: 'productDescription', title: 'Description', type: 'string'},
        {name: 'cost', title: 'Cost',  type: 'number'},
        {name: 'stock', title: 'Stock', type: 'number'},
        {name: 'discontinued', title: 'Discontinued',  type: 'Date'},
        {name: 'dateAdded', title: 'Added',  type: 'Date'},
    ];

    constructor(private _id: number,
                private _productCode: string,
                private _productName: string,
                private _productDescription: string,
                private _stock: number,
                private _cost: number,
                private _discontinued: Date,
                private _dateAdded: Date) {}

    static get columns(): {name: string, title: string, type: string}[] {
        return this._columns.slice();
    }

    get productCode(): string {
        return this._productCode;
    }

    set productCode(value: string) {
        this._productCode = value;
    }

    get productName(): string {
        return this._productName;
    }

    set productName(value: string) {
        this._productName = value;
    }

    get productDescription(): string {
        return this._productDescription;
    }

    set productDescription(value: string) {
        this._productDescription = value;
    }

    get stock(): number {
        return this._stock;
    }

    set stock(value: number) {
        this._stock = value;
    }

    get cost(): number {
        return this._cost;
    }

    set cost(value: number) {
        this._cost = value;
    }

    get discontinued(): Date {
        return this._discontinued;
    }

    set discontinued(value: Date) {
        this._discontinued = value;
    }

    get dateAdded(): Date {
        return this._dateAdded;
    }

    set dateAdded(value: Date) {
        this._dateAdded = value;
    }

    get id(): number {
        return this._id;
    }

}
