import { Request, Response } from 'express-serve-static-core'
import { endpoint, language_code, getLexicalEntries } from './oxford/lib/oxford-api';
import { calculation } from './calculator/lib/calculator-api';
import { primeChecker } from './prime/lib/primeChecker-api';
import { readFile } from './csv_read/lib/readFile';
import * as mustache from 'mustache';


export async function indexDisplay(req: Request, res: Response) {
    const file = await readFile("assets/index.html");
    res.send(file);
}
 
export async function definitions(req: Request, res: Response) {
    try {
        const word: string = req.query.word;
        var URL: string = "https://od-api.oxforddictionaries.com/api/v2/" + endpoint + "/" + language_code + "/" + word;
        let lexicalEntries = await getLexicalEntries(URL);

        let templateResult = mustache.render(await readFile('assets/templates/oxfordResultDisplay.html'), {
            word: word,
            entries: lexicalEntries
        });
        res.status(200).send(templateResult);
    } catch (error) {
        let errorTemplate = mustache.render(await readFile('assets/templates/oxfordResultDisplay.html'), {
            errorMessage: "Word not found, please try again."
        });
        res.status(404).send(errorTemplate);
    }
}

export async function calculator(req: Request, res: Response) {
    try {
        const numa: number = Number(req.query.numa);
        const numb: number = Number(req.query.numb);
        const operator: string = req.query.operator;

        const result: number = await calculation(numa, numb, operator);

        let templateResult = mustache.render(await readFile('assets/templates/calculatorResults.html'), {
            result: numa + " " + operator + " " + numb + " = " + result

        });
        res.status(200).send(templateResult);

    } catch (err) {
        let templateResult = mustache.render(await readFile('assets/templates/calculatorResults.html'), {
            errorMessage: "Please enter 2 valid numbers."

        });
        res.status(404).send(templateResult);
    }

}

export async function prime(req: Request, res: Response) {
    try {
        const num: number = Number(req.query.num);
        const isPrime: string = await primeChecker(num);

        let templateResult = mustache.render(await readFile('assets/templates/primeResult.html'), {
            result: isPrime
        });

        res.status(200).send(templateResult);
    } catch (err) {
        let templateResult = mustache.render(await readFile('assets/templates/primeResult.html'), {
            errorMessage: "Please enter a valid number."

        });
        res.status(404).send(templateResult);
    }

}