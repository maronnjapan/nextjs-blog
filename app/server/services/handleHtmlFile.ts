import { z } from "zod";
import { t } from "../trpc";
import fs from "fs";


const getCssTextInFle = (filePath: string) => fs.readFileSync(filePath);

const addStyleTag = (code: string, addFirst = '<style>', addEnd = '</style>') => `${addFirst}${code}${addEnd}`;

export const createCode = t.procedure
    .input(z.object({ htmlCode: z.string(), writeFilePath: z.string(), readFilePath: z.string(), addCssText: z.string() }))
    .mutation(({ input }) => {
        const cssTextInFile = getCssTextInFle(__dirname.replace(/nextjs-microblog[\s\S]*/gi, "nextjs-microblog") + input.readFilePath);
        const cssText = addStyleTag(cssTextInFile + input.addCssText);
        fs.writeFileSync(__dirname.replace(/nextjs-microblog[\s\S]*/gi, "nextjs-microblog") + input.writeFilePath, cssText + input.htmlCode)
    })

export const getCode = t.procedure.input(z.object({ fileName: z.string() })).output(z.string()).query(({ input }) => {
    const file = fs.readFileSync(__dirname.replace(/nextjs-microblog[\s\S]*/gi, "nextjs-microblog") + input.fileName);
    return file.toString('utf-8');
})