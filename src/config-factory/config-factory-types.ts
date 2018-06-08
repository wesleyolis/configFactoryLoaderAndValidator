import {ConfigSettings} from '../config-options/config-settings-types'

export enum ConfigFactoryClass {

    factory = "Factory",
    module = "Module",
    service = "Service",
    netService = "NetworkService"
}

export enum ConfigFactoryTypes {
    production = "Production",
    mock = "Mock"
}