import { ShinePage } from './app.po';

describe('shine App', function() {
  let page: ShinePage;

  beforeEach(() => {
    page = new ShinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
