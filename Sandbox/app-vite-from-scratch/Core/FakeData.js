import { LoremIpsum } from "lorem-ipsum";
import { faker } from '@faker-js/faker'
// https://github.com/faker-js/faker

const lorem = new LoremIpsum({ sentencesPerParagraph: { max: 8, min: 4 },
                                wordsPerSentence: { max: 16, min: 4 } });

const newRandomProjectData = () => {
  const id = [ "PMGT_", Math.floor( Math.random() * 9999 ) ].join('');
  return {
    ticket_number: id,
    ticket_ref: "https://somehost.not/jirs/path/" + id,
    summary: lorem.generateSentences( 1 ),
    description: lorem.generateParagraphs( 1 )
  }
}

const prepareForStorage = ( data ) =>(
  { ...data, type: 'Project', _id: nanoid(), created_on: new Date().toISOString(), updated_on: null,  } )
export const newProjectData = () => prepareForStorage( newRandomProjectData() )


