// import fs from "fs";
// import path from "path";


// export default function writeHtmlData(req,res) {
//     const fileDirectory = path.join(process.cwd(), "files/test.html");
//     const cssDirectory = path.join(process.cwd(),'node_modules/@uiw/react-markdown-preview/markdown.css')
//     const file = fs.readFileSync(cssDirectory, 'utf8');

//      fs.writeFileSync(fileDirectory, `<style>${file.replace(/\n/gi,'')}
//      .code-line {
//         display: block;
//         height: 20px;
//     }

//     .wmde-markdown pre>code {
//         overflow: visible;
//     }
//     </style>
//     `);

//     return res.status(200).json({test:file.replace(/\n/gi,'')});
// }