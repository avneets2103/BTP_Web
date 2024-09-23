import React from 'react'
import { DocLayout, DocLayoutItem } from '../DocLayout';
import { DocSchema } from '@/Interfaces';

interface Props {
    data: DocSchema[];
    searchDoc: string;
}

function DocHero({data, searchDoc}: Props) {
    const filteredData = data.filter((doc: DocSchema) => {
      const lowerCaseSearchDoc = searchDoc.toLowerCase();
      return (
        doc.name.toLowerCase().includes(lowerCaseSearchDoc) ||
        doc.speciality.toLowerCase().includes(lowerCaseSearchDoc) ||
        doc.qualifications.toLowerCase().includes(lowerCaseSearchDoc) ||
        doc.experience.toLowerCase().includes(lowerCaseSearchDoc)
      );
    });
  
    return (
      <DocLayout className='w-full h-full'> 
        {filteredData.map((doc) => (
          <DocLayoutItem
            key={doc.id}
            id={doc.id}
            name={doc.name}
            speciality={doc.speciality}
            img={doc.imageLink}
            qualification={doc.qualifications}
            experience={doc.experience}
            patientsList={doc.patientsList}
          />
        ))}
      </DocLayout>
    );
  }

export default DocHero
