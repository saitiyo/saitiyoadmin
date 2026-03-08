 interface CountryType {
      id:string
      name: string
      flagUri:string
      callingCode:string
      currencyCode:string
      currencySymbol:string
      timeZone:string
      timeOffset:number
  }

  interface CreateCountryData {
  createCountry: {
    id: string;
  };
}
