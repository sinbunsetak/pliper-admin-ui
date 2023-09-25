import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import IndexPage from "@/pages";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/IndexPage">
                <IndexPage/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;