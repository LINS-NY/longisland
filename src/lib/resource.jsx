import fs from 'fs';
import path from 'path'
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { components } from './component';

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

  export async function getPostData(id) {
    const resourceFolder = path.join(process.cwd(), 'src/resources')
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