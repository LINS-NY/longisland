import fs from 'fs';
import path from 'path';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CommunityBuildingClient from './CommunityBuildingClient'; // client component

export default function CommunityBuildingPage() {
  const pptDir = path.join(process.cwd(), 'public/Community-Building-Files/PowerPoint');
  const notesDir = path.join(process.cwd(), 'public/Community-Building-Files/Notes');

  const pptFiles = fs.readdirSync(pptDir)
    .filter(name => name.endsWith('.pdf'))
    .map(name => ({
      label: name,
      value: `/Community-Building-Files/PowerPoint/${name}`
    }))
    .reverse(); // latest first

  const noteFiles = fs.readdirSync(notesDir)
    .filter(name => name.endsWith('.pdf'))
    .map(name => ({
      label: name,
      value: `/Community-Building-Files/Notes/${name}`
    }))
    .reverse();

  return (
    <>
      <Header />
      <CommunityBuildingClient pptFiles={pptFiles} noteFiles={noteFiles} />
      <Footer />
    </>
  );
}
