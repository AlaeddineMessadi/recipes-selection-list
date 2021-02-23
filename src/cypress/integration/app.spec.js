export {};

describe('Registration App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should work', () => {});

  // it('should display the the list page', () => {
  //   cy.get('h1').contains('Select Your Recipes');
  //   cy.get('p').contains('Choose from an ever-changing mix of meat, fish, Beyond Meat™ and health-conscious offerings');
  // });

  // it('should display headline', () => {
  //   cy.wait(100);
  //   cy.get('h3').first().contains('WEEK OF OCTOBER 12TH');
  //   cy.get('h3').eq(1).contains('$66.92');
  // });

  // it('should display 21 recipes list', () => {
  //   cy.wait(100);
  //   cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]').should('have.length', 21)
  // });

  // it('should handle Remove recipe', () => {

  //   // select first Recipe
  //   cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]')
  //     .first()
  //     .find('button')
  //     .first()
  //     .click()
  //     // select total
  //   cy.get('h3')
  //     .eq(1)
  //     .contains('$48.94');

  //   // should hide remove button and show only Add button
  //   cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]')
  //     .first()
  //     .find('button')
  //     .should('have.length', 1)
  //     .contains('Add');
  // });

  // it('should show Summary', () => {
  //   // click price info tooltip
  //   cy.get('[data-testid="price-info-tooltip"]').find('button').click();

  //   cy.get('[data-testid="price-summary"]')
  //     .should('have.length', 1)
  //     .contains('$17.98')
  //     .contains('Total')
  //     .contains('$66.92')
  //     .contains('Chicken Sausage & Spinach Ravioli')
  //     .find('[data-name="row"]')
  //     .should('have.length', 5)
  // });

  // it('Should disable add Receipe when MaxLimit', () => {
  //   // select secend recipe and click add
  //   cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]')
  //     .eq(1)
  //     .find('button')
  //     .eq(1)
  //     .click({ multiple: true })
  //     .click()
  //     .click()
  //     .click()
  //     .click();

  //   // +  add should be disabled
  //   cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]')
  //       .eq(1)
  //     .find('button')
  //     .should('be.disabled')

  //   // Add Extra Meal should be disabled
  //   cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]')
  //     .eq(3)
  //     .find('button')
  //     .should('be.disabled')

  //   // total should be
  //      cy.get('h3')
  //     .eq(1)
  //     .contains('$156.82');
  // });

  it('Should show ADD EXTRA MEAL button when MinLimit', () => {
    // select secend recipe and click add
    cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]').first().find('button').first().click();

    cy.get('[data-name="col-sm-12 col-md-6 col-xl-4"]')
      .first()
      .find('button')
      .first()
      .contains('ADD EXTRA MEAL');
  });
});
