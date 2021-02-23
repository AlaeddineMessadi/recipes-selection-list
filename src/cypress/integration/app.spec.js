export {};

describe('Registration App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should work', () => {});

  it('should display the the list page', () => {
    cy.get('h1').contains('Select Your Recipes');
    cy.get('p').contains(
      'Choose from an ever-changing mix of meat, fish, Beyond Meat™ and health-conscious offerings'
    );
  });

  it('should display headline', () => {
    cy.wait(100);
    cy.get('h3').first().contains('WEEK OF OCTOBER 12TH');
    cy.get('h3').eq(1).contains('$66.92');
  });

  it('should display 24 recipes list', () => {
    cy.wait(200);
    cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]').should('have.length', 21);
  });
});
