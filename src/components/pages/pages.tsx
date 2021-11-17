import React from "react";
import "./pages.scss";
import { BaseProps } from "../../model/BaseModel";
import CatBreedsList from "./cats/CatBreedsList";

interface PagesProps extends BaseProps {
    aid?: "pages"
}

const Pages: React.FC<PagesProps> = (props: PagesProps) => {

    return (
        <div className="pages" id={props.aid}>
            <CatBreedsList apiKey={props.apiKey} />
        </div>
    );
};
export default Pages;