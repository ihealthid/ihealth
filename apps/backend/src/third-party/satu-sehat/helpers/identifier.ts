const identifierSystem = {
  nik: 'https://fhir.kemkes.go.id/id/nik',
  paspor: 'https://fhir.kemkes.go.id/id/paspor',
  kk: 'https://fhir.kemkes.go.id/id/kk',
};

export const createIdentifier = (
  name: keyof typeof identifierSystem,
  value: string,
) => {
  return {
    use: 'official',
    system: identifierSystem[name],
    value,
  };
};
