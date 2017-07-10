import { ProductFrontPage } from './app.po';

describe('product-front App', () => {
  let page: ProductFrontPage;

  beforeEach(() => {
    page = new ProductFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
