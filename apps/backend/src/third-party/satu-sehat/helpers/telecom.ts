type Use = 'mobile' | 'home';
type System = 'phone' | 'email';

export const createTelecom = (system: System, use: Use, value: string) => ({
  system,
  value,
  use,
});
