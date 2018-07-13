import * as BluebirdPromisify from './util/bluebird-promisify';
export { BluebirdPromisify as BluebirdPromisify };
export declare function getDBConnectionString(database: string): Promise<string>;
export declare function hasDBConfig(database: string): boolean;
