import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({

    Course: a.model({
        courseID: a.id(),
        courseName: a.string(),
        material: a.hasMany('Material', 'courseID')
    })
        .authorization(allow => [allow.publicApiKey()]),

    Material: a.model({
        materialID: a.id(),
        materialName: a.string(),
        materialType: a.enum(["Script","Repetorium", "Probeklausur", "Video", "Script Fragen", "Kurs Fragen", "Literatur Hinweis"]),
        materialDescription: a.string(),
        courseID: a.id(),
        course: a.belongsTo('Course', 'courseID'),
        material: a.hasMany('Error', 'materialID'),
    })
        .authorization(allow => [allow.publicApiKey()]),

    Error: a.model({
        errorID: a.id(),
        errorName: a.string(),
        errorType: a.enum(["Rechtschreibfehler", "grammatikalischer Fehler", "inhaltlicher Fehler", "veraltete Information",
            "nicht Verfügbarkeit von verlinkten Materialien", "verbesserungs Vorschlag"]),
        description: a.string(),
        status: a.enum(["Neu", "in Bearbeitung", "warten auf Feedback", "Gelöst", "Abgelehnt"]),
        materialID: a.id(),
        material: a.belongsTo('Material', 'materialID'),
        error: a.hasMany('Addition', 'errorID'),
    })
        .authorization(allow => [allow.publicApiKey()]),

    Addition: a.model({
        description: a.string(),
        addtionType: a.enum(["Ergänzung", "History"],),
        errorID: a.id(),
        error: a.belongsTo('Error', 'errorID')
    })
        .authorization(allow => [allow.publicApiKey()]),
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