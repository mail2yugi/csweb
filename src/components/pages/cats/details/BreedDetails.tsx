import AuthAction from "../../../../actions/AuthAction";
import CatsActions from "../../../../actions/CatsActions";
import React, { useEffect, useState } from "react";
import "./BreedDetails.scss";
import CatsStore from "../../../../stores/CatsStore";
import { BaseProps } from "../../../../model/BaseModel";
import AppLoader from "../../../shared/Loader/AppLoader";

interface CatBreedsListProps extends BaseProps {
    aid?: "breeds-details",
    beedId: string,
    breedName: string
}

const BreedDetails: React.FC<CatBreedsListProps> = (props: CatBreedsListProps) => {

    const [showLoader, setShowLoader] = useState(null);
    const [breedDetails, setBreedDetails] = useState(null);

    const getBreedDetails = (res) => {
        setBreedDetails(res[0]);
        setShowLoader(false);
    }

    const shopLoading = () => {
        setBreedDetails(null);
        setShowLoader(false);
    }

    useEffect(() => {
        CatsStore.addChangeListener('breed-details', getBreedDetails);
        CatsStore.addChangeListener('breed-details-error', shopLoading);
        AuthAction.updateBreadCrumbList({ apiKey: props.apiKey, links: ["Home", "BreedsList", props.breedName] });
        CatsActions.getBreedDetails({ apiKey: props.apiKey, id: props.beedId });
        setShowLoader(true);
        return () => {
            CatsStore.removeChangeListener('breed-details', getBreedDetails);
            CatsStore.removeChangeListener('breed-details-error', shopLoading);
        }
    }, [])


    return (<React.Fragment>
        {!showLoader && breedDetails ?
            <div className="breeds-details" id={props.aid}>
                <div className="left"><img src={breedDetails.url} /></div>
                <div className="right">
                    <div className="row">
                        <div className="col1">Name</div>
                        <div className="col4">{breedDetails.breeds[0].name}</div>
                    </div>
                    <div className="row">
                        <div className="col1">Description</div>
                        <div className="col4">{breedDetails.breeds[0].description}</div>
                    </div>
                    <div className="row">
                        <div className="col1">Temperment</div>
                        <div className="col4">{breedDetails.breeds[0].temperament}</div>
                    </div>
                    <div className="row">
                        <div className="col1">Weight(Metric)</div>
                        <div className="col4">{breedDetails.breeds[0].weight?.metric}</div>
                    </div>
                    <div className="row">
                        <div className="col1">Origin</div>
                        <div className="col4">{breedDetails.breeds[0].origin}</div>
                    </div>
                    <div className="row">
                        <div className="col1">Currenty</div>
                        <div className="col4">{breedDetails.breeds[0].country_codes}</div>
                    </div>
                    <div className="row">
                        <div className="col1">Wiki Page</div>
                        <div className="col4"><a href={breedDetails.breeds[0].wikipedia_url} rel="noreferrer" target="_blank">History</a></div>
                    </div>
                </div>
            </div >
            : <AppLoader />
        }</React.Fragment>);
};
export default BreedDetails;