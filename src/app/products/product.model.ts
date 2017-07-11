export class Product {
    constructor(public productCode: string, public productName: string, public productDescription: string,
                public stock: number, public cost: number, public discontinued: Date, public dateAdded: Date) {}
}
