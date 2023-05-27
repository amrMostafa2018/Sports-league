export interface IAppConfig {
    
    env: {
      name: string,
      securityLogin: string,
      offlineMode:string,
      module:string 
    };
    apiServer: {
        url:string,
        CommonApiUrl: string,
        loginUrl: string,
        CentralIndexURL:string,
        baseHref: string,
        HmisSrvURL:string,
        signalRUrl:string
    };
    OpenCase: {
      PatientType:string,
      DoctorNumber: string,
      ClinicCode :  string
     
    }
}
