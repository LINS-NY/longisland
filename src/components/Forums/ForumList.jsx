'use client'
import * as React from 'react';
import IndividualForum from './IndividualForum';

const ForumList = ({data}) => {
    return (
        <div>
			<div class="-mx-4 sm:-mx-2 px-4 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="sm:w-10 min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="sm:px-1 sm:py-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:font-normal font-semibold text-gray-600 uppercase tracking-wider">
									Topic
								</th>
                                <th
									class=" sm:px-1 sm:py-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Created By
								</th>
								<th
									class="sm:px-1 sm:py-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Replies
								</th>
								<th
									class="sm:px-1 sm:py-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Activity
								</th>
							</tr>
						</thead>
                            <IndividualForum data={data}/>
					</table>
					<div
						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
						<div class="inline-flex mt-2 xs:mt-0">
							<button
                                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
							&nbsp; &nbsp;
							<button
                                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default ForumList