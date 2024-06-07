import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { components } from './component';
const { google } = require('googleapis');

const credential =  JSON.parse(atob(process.env.GOOGLE_SERVICE_KEY))

export async function getAllResourcesID(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    q: `'${location}' in parents and trashed=false`
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

export async function getFinancialDocs(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  const client = google.sheets({version: "v4", auth: auth})
  const res = await client.spreadsheets.get({
    spreadsheetId: location,
  });
}


export async function getAllFinances(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    files: location
  })
  const resourcesRemoved = res.data.files.filter((name)=>name.mimeType == "application/vnd.google-apps.spreadsheet")
  return resourcesRemoved.map((name) =>{
    return {
      params: {
        documentId: name.id,
    },
  }
});
}


export async function getAllResources(location){
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  })
  const client = google.drive({version: "v3", auth: auth})
  const res = await client.files.list({
    files: location
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
