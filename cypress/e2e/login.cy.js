import { errorMessages } from '../../src/errorMessages';

describe('Login Formu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('a) Başarılı form doldurulduğunda submit -> success sayfası açılır', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('Aa123456!');
    cy.get('[data-testid="terms-checkbox"]').check();

    cy.get('[data-testid="submit-btn"]').should('not.be.disabled').click();
    cy.url().should('include', '/success');
    cy.get('[data-testid="success-title"]').should('contain', 'Giriş Başarılı');
  });

  it('b-1) Email yanlış -> 1 hata mesajı var, doğru email hatası, buton disabled', () => {
    cy.get('[data-testid="email-input"]').type('test@com').blur();
    cy.get('[data-testid="password-input"]').type('Aa123456!').blur(); 
    cy.get('[data-testid="terms-checkbox"]').check().blur(); 

    
    cy.get('[data-testid="error-msg"]').should('have.length', 1);
    cy.get('[data-testid="error-msg"]').first().should('contain', errorMessages.emailInvalid);
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
  });

  it('b-2) Email ve password yanlış -> 2 hata mesajı ve password hatası görünüyor', () => {
    cy.get('[data-testid="email-input"]').type('kotu@mail').blur(); 
    cy.get('[data-testid="password-input"]').type('123').blur(); 
    cy.get('[data-testid="terms-checkbox"]').check().blur();

    cy.get('[data-testid="error-msg"]').should('have.length', 2);
    cy.contains('[data-testid="error-msg"]', errorMessages.passwordInvalid).should('exist');
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
  });

  it('b-3) Email & password doğru ama kuralları kabul etmedim -> buton disabled', () => {
    cy.get('[data-testid="email-input"]').type('ok@example.com').blur();
    cy.get('[data-testid="password-input"]').type('Aa123456!').blur();

    cy.get('[data-testid="submit-btn"]').should('be.disabled');
  });
});
