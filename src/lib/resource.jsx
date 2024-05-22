import fs from 'fs';
import path from 'path'

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
    const resourceFoler = path.join(process.cwd(), 'src/resources')
    const fullPath = path.join(resourceFoler, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const {data, content} = matter(fileContents);
  
    // Combine the data with the id
    return {
      id,
      content,
      ...data,
    };
  }