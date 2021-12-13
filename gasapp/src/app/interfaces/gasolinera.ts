export interface GasolineraListResponse {
    fecha:             string;
    listaEESSPrecio:   Gasolinera[];
    nota:              string;
    resultadoConsulta: string;
}

export interface Gasolinera {
    cP:                             string;
    direccion:                      string;
    horario:                        string;
    latitud:                        string;
    localidad:                      string;
    longitudWGS84:                  string;
    margen:                         string;
    municipio:                      string;
    precioBiodiesel:                string;
    precioBioetanol:                string;
    precioGasNaturalComprimido:     string;
    precioGasNaturalLicuado:        string;
    precioGasesLicuadosDelPetroleo: string;
    precioGasoleoA:                 string;
    precioGasoleoB:                 string;
    precioGasoleoPremium:           string;
    precioGasolina95E10:            string;
    precioGasolina95E5:             string;
    precioGasolina95E5Premium:      string;
    precioGasolina98E10:            string;
    precioGasolina98E5:             string;
    precioHidrogeno:                string;
    provincia:                      string;
    remision:                       string;
    rotulo:                         string;
    tipoVenta:                      string;
    bioEtanol:                      string;
    esterMetilico:                  string;
    ideess:                         string;
    idMunicipio:                    string;
    idProvincia:                    string;
    idccaa:                         string;
}

export interface Provincia {
  IDPovincia: string;
  IDCCAA:     string;
  Provincia:  string;
  CCAA:       string;
}

export interface Municipio {
  IDMunicipio: string;
  IDProvincia: string;
  IDCCAA:      string;
  Municipio:   string;
  Provincia:   string;
  CCAA:        string;
}


export interface GasolineraFavFirebase{

  direccion : string;
  id:         string;
  rotulo:     string;
  uid:        string;


}