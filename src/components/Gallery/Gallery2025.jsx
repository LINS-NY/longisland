'use client';
import { useState } from "react";
import ImagePop from '../ImagePop/ImagePop'
import Description from "../Description/Description"
import InternationalWomenDay from "./2025/InternationalWomenDay";

const yearlyEvent = [InternationalWomenDay]



//Do Not Touch the code below
const EventGallery = () => {
    return (

        <div class="mx-10">
            {yearlyEvent && yearlyEvent.map((object, i) =>
                <div class="flex-row" key={i}>
                    <Description description={object.description} key={i} />
                    <ImagePop imageList={object.images} key={i} />
                </div>)
            }
        </div>
    )
}

export default EventGallery