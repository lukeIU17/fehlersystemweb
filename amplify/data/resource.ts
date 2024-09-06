import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({

    Course: a.model({
        courseID: a.id(),
        courseName: a.string(),
        material: a.hasMany('Material', 'courseID')
    })
        .authorization((allow) => [allow.publicApiKey()]),

    Material: a.model({
        materialID: a.id().required(),
        materialName: a.string().required(),
        materialType: a.enum(["script","repetorium", "probeklausur", "video", "scriptFragen", "kursFragen", "literaturHinweis"]),
        materialDescription: a.string().required(),
        courseID: a.id().required(),
        course: a.belongsTo('Course', 'courseID'),
        material: a.hasMany('Error', 'materialID'),
    })
        .authorization((allow) => [allow.publicApiKey()]),

    Error: a.model({
        errorID: a.id().required(),
        errorName: a.string().required(),
        errorType: a.enum(["rechtschreibFehler", "grammatikalischerFehler", "inhaltlicherFehler", "veralteteInformation",
            "nichtVerfuegbarkeitVonVerlinktenMaterialien", "verbesserungsVorschlag"]),
        description: a.string().required(),
        status: a.enum(["new", "reviewing", "pending", "solved", "declined"]),
        materialID: a.id().required(),
        material: a.belongsTo('Material', 'materialID'),
        error: a.hasMany('Addition', 'errorID'),
    })
        .authorization((allow) => [allow.publicApiKey()]),

    Addition: a.model({
        description: a.string().required(),
        addtionType: a.enum(["Ergaenzung", "History"],),
        errorID: a.id().required(),
        error: a.belongsTo('Error', 'errorID')
    })
        .authorization((allow) => [allow.publicApiKey()]),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 }
    }
});