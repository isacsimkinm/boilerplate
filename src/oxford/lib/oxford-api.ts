import * as axios from 'axios';

export type LexicalEntry = {
    lexicalCategory: string,
    definitions: string[],
    pronunciations: Pronunciation[]
}

export type Pronunciation = {
    phoneticNotation: string,
    phoneticSpelling: string
}

export const options = {
    headers: {
        app_id: "08721936",
        app_key: "d72dbc5f85321dc395180441827b9a53"
    }
}

export const language_code = "en-us";
export const endpoint = "entries";

export const getLexicalEntries = async (url: string): Promise<LexicalEntry[]> => {
    const req = await axios.default.get(url, options);
    let masterArray: LexicalEntry[] = [];

    let lexicalEntryLength = req.data.results[0].lexicalEntries.length;

    for (let i = 0; i < lexicalEntryLength; i++) {
        let lexicalEntryPreFix = req.data.results[0].lexicalEntries[i];

        let lexicalCategory: string = lexicalEntryPreFix.lexicalCategory.text;

        let lexicalEntry: LexicalEntry = {
            lexicalCategory: lexicalCategory,
            definitions: [],
            pronunciations: []
        };

        let pronunciationsLength = lexicalEntryPreFix.pronunciations.length;
        for (let j = 0; j < pronunciationsLength; j++) {
            let phoneticNotation = lexicalEntryPreFix.pronunciations[j].phoneticNotation;
            let phoneticSpelling = lexicalEntryPreFix.pronunciations[j].phoneticSpelling;

            let pronunciation: Pronunciation = {
                phoneticNotation: phoneticNotation,
                phoneticSpelling: phoneticSpelling
            }

            lexicalEntry.pronunciations.push(pronunciation);
        }

        let definitionsLength = lexicalEntryPreFix.entries[0].senses.length;
        for (let j = 0; j < definitionsLength; j++) {
            let definitions: string = lexicalEntryPreFix.entries[0].senses[j].definitions[0];
            lexicalEntry.definitions.push(definitions);
        }
        masterArray.push(lexicalEntry);
    }

    return masterArray;
}