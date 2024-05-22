import * as React from 'react';
import Link from 'next/link'

const IndividualItem = ({items}) => {
    return(
      <article class="p-4 flex flex-col justify-between gap-2 border rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-400/40">
        <Link  href={`/Resource/${encodeURIComponent(items.id)}`}>
        <header class="text-center p-2 md:p-4 font-bold text-gray-500 dark:text-gray-400">
          <h1 class="text-lg">
                    {items.Title}
          </h1>
          </header>
          <div class="text-center p-4 text-sm md:text-lg font-semibold text-gray-500 dark:text-gray-400">
              <p class="line-clamp-3">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </p>
          </div>
          <footer class="flex items-center justify-between leading-none p-5 md:p-4 text-gray-500 dark:text-gray-400">
            <p class="ml-2 text-sm">
                LINS
            </p>
            <p class="text-grey-darker text-sm">
              {items.Date}
          </p>
          </footer>
      </Link>
      </article> 
    )
}

export default IndividualItem
