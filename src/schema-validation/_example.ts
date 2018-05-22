import {} from './types';

export type Config<T extends SelectOptions> = {
    port: Select<ValidationTypeNumber, T>,
    database: Select<Optional<ValidationTypeString>, T>,
    t2: Select<ValidationTypeNumber, T>,
    arrayString: Select<ValidationTypeArray<ValidationTypeString, T>, T>,
    arrayObject: Select<ValidationTypeObjectArray<{
        p1: ValidationTypeNumber,
        p2: ValidationTypeString
    }, T>, T>,
    arrayStringOptional: Select<Optional<ValidationTypeArray<ValidationTypeString, T>>, T>,
    arrayObjectOptional: Select<Optional<ValidationTypeObjectArray<{
        p1: ValidationTypeNumber,
        p2: ValidationTypeString
    }, T>>, T>,
    arrayStringOptionalParam: Select<ValidationTypeArray<Optional<ValidationTypeString>, T>, T>,
    arrayObjectOptionalParam: Select<ValidationTypeObjectArray<{
        p1: Optional<ValidationTypeNumber>,
        p2: ValidationTypeString
    }, T>, T>,
    arrayStringOptionalNullableParam: Select<ValidationTypeArray<Optional<Nullable<ValidationTypeString>>, T>, T>,
    arrayObjectOptionaNullablelParam: Select<ValidationTypeObjectArray<{
        p1: Optional<Nullable<ValidationTypeNumber>>,
        p2: Nullable<ValidationTypeString>
    }, T>, T>,
}

export type ConfigSettingsSchema = Config<Schema>;
export type ConfigSettingsValidator = Config<Validator>;

export const ConfigSettingsSchema: ConfigSettingsSchema = {
    database: undefined,
    port: 0,
    t2: 0,
    arrayString: ['test', 'string'],
    arrayObject: [{ p1: 0, p2: '22' }, { p1: 0, p2: '44' }, { p1: 0, p2: '22' }, { p1: 0, p2: '44' }],
    arrayStringOptional: undefined,
    arrayObjectOptional: undefined,
    arrayStringOptionalParam: [undefined, "sdfsdf"],
    arrayObjectOptionalParam: [{p1:undefined, p2: 'sdfsdf'}],
    arrayStringOptionalNullableParam: [null, undefined , "string"],
    arrayObjectOptionaNullablelParam: [{p1:undefined, p2:'sdsf'}, {p1:null, p2:'sdsf'}, {p1:10, p2:'sdsf'},
    {p1:undefined, p2:null}, {p1:null, p2:null}, {p1:10, p2:null}]
}

export const ConfigSettingsValidator: ConfigSettingsValidator = {
    port: {
        allowNull: false,
        lower: 0,
        upper: 1,
        kind: "number"
    },
    database: {
        kind: "reg",
        minLen: 0,
        maxLen: 10,
        regx: "yyy",
        optional: true
    },
    t2: {
        kind: "number",
        allowNull: false,
        lower: 0,
        upper: 1
    },
    arrayString: {
        kind: "array",
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    },

    arrayObject: {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    },

    arrayStringOptional: {
        kind: "array",
        optional: true,
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    },

    arrayObjectOptional: {
        kind: "objectArray",
        optional: true,
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    },

    arrayStringOptionalParam: {
        kind: "array",
        elements: {
            optional: true,
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    },

    arrayObjectOptionalParam: {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
                optional: true,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    },

    arrayStringOptionalNullableParam: {
        kind: "array",
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx",
            optional: true,
            nullable : true
        }
    },
    arrayObjectOptionaNullablelParam: {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
                optional: true,
                nullable : true,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx",
                nullable : true
            }
        }
    }
};
