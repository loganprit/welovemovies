/**
 * Global Jest test configuration
 * Sets up test environment with appropriate timeouts
 */
beforeEach((): void => {
  jest.setTimeout(30000);
});
