'use client';
import { useState } from "react";
import ImagePop from '../ImagePop/ImagePop'
import Description from "../Description/Description"
import NepaliNewYear2081 from "./2024/NepaliNewYear2081";
import Teej from "./2024/Teej";
import BloodDrive from "./2024/BloodDrive";
import ImmigrationRightsInteractionProgram from "./2024/ImmigrationRightsInteractionProgram";


const yearlyEvent = [NepaliNewYear2081,Teej,BloodDrive,ImmigrationRightsInteractionProgram]



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