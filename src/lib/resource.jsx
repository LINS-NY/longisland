import fs from 'fs';
import path from 'path'
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { components } from './component';
const { google } = require('googleapis');

const credential =  JSON.parse(atob(process.env.GOOGLE_SERVICE_KEY))

export function getAllPostIds() {
    const fileNames = fs.readdirSync(path.join(process.cwd(), 'src/resources'));
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }

export async function getAllResourcesID(){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    files: '1Z3iLf79gKWsyFVqEh1xAyUUuz4gRAozI'
  })
  const resourcesRemoved = res.data.files.filter((name)=>name.name != "Resources")
  return resourcesRemoved.map((name) =>{
    return {
      params: {
        documentId: name.id,
    },
  }
});
}

export async function getAllResources(){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    files: '1Z3iLf79gKWsyFVqEh1xAyUUuz4gRAozI'
  })
  const resourcesRemoved = res.data.files.filter((name)=>name.name != "Resources")
  return resourcesRemoved.map((name) =>{
    return {
      params: {
        id: name.name.replace(/\.md$/, ''),
    },
  }
});
}

export async function googleDocsGet(id) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credential.client_email,
        private_key: credential.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/documents'],
    })
    const client = google.docs({version: "v1", auth: auth})
    const res = await client.documents.get({
      documentId: id,
    });

    const contents = res.data.body.content.filter(value => value.paragraph != undefined)
    const text = contents.reduce((fullContent, value)=>{
      return (
        fullContent += value.paragraph.elements.reduce((joinText,element)=>{
          return (
            joinText += Buffer.from(element.textRun.content).toString()
          )
        },"")
      )
    },"")
    const {data, content} = matter(Buffer.from(text).toString());
    const contentRd = <MDXRemote source={content} components={components}/>
    return {
      id,
      contentRd,
      content,
      ...data,
    };
  }


  export async function getPostData(id) {
    const resourceFolder = path.join(process.cwd(), 'src/resources')
    //google docs folder linsny.gmail/webartive
    const fullPath = path.join(resourceFolder, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const {data, content} = matter(fileContents);
     const contentRd = <MDXRemote source={content} components={components}/>
      
  
    // Combine the data with the id
    return {
      id,
      contentRd,
      content,
      ...data,
    };
  }