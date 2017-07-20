interface ProductColumn {
    name: string,
    title: string,
    type: string,
    property: string
}
export class Product {
    private static _columns: ProductColumn[] = [
        {name: 'productCode', title: 'Code', type: 'string', property: 'productCode'},
        {name: 'productName', title: 'Name', type: 'string', property: 'productName'},
        {name: 'productDescription', title: 'Description', type: 'string', property: 'productDescription'},
        {name: 'cost', title: 'Cost',  type: 'number', property: 'price'},
        {name: 'stock', title: 'Stock', type: 'number', property: 'stockSize'},
        {name: 'discontinued', title: 'Discontinued',  type: 'Date', property: 'dtmDiscontinued'},
        {name: 'dateAdded', title: 'Added',  type: 'Date', property: 'dtmAdded'},
    ];

    constructor(private _id: number,
                private _productCode: string,
                private _productName: string,
                private _productDescription: string,
                private _stock: number,
                private _cost: number,
                private _discontinued: Date,
                private _dateAdded: Date,
                private _timestamp: Date = null) {
    }

    static get columns(): ProductColumn[] {
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

    get timestamp(): Date {
        return this._timestamp;
    }

}
