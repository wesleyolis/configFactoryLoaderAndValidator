import * as JoiX from '../../src/joi-x'

sdfsf
const objectSchemaDef = {
    numberRequired: number().required()
};

const instanceCompilers: ExtractFromObject<typeof objectSchemaDef>= {
    numberRequired: undefined
}`;