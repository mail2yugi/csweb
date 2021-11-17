import AuthAction from "../../../actions/AuthAction";
import CatsActions from "../../../actions/CatsActions";
import React, { useEffect, useState } from "react";
import "./CatBreedsList.scss";
import AuthStore from "../../../stores/AuthStore";
import CatsStore from "../../../stores/CatsStore";
import { BaseProps } from "../../../model/BaseModel";
import AppLoader from "../../shared/Loader/AppLoader";
import BreedDetails from "./details/BreedDetails";

interface CatBreedsListProps extends BaseProps {
    aid?: "breeds-list"
}

const CatBreedsList: React.FC<CatBreedsListProps> = (props: CatBreedsListProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [breedsList, setBreedsList] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [breedId, setBeedId] = useState('');
    const [breedName, setBeedName] = useState('');

    const breedList = (list) => {
        setBreedsList(list);
        setIsLoading(false);
    }

    const breaCrumbClick = () => {
        setShowDetails(false);
    }

    useEffect(() => {
        AuthStore.addChangeListener('notify-breadcrumb-click', breaCrumbClick);
        CatsStore.addChangeListener('breed-list', breedList);
        if (props.apiKey && breedsList && breedsList.length === 0) {
            AuthAction.updateBreadCrumbList({ apiKey: props.apiKey, links: ["Home", "BreedsList"] });
            CatsActions.getListOfBreeds({ apiKey: props.apiKey });
            setIsLoading(true);
        }
        return () => {
            CatsStore.removeChangeListener('breed-list', breedList);
            AuthStore.removeChangeListener('notify-breadcrumb-click', breaCrumbClick);
        }
    })

    const viewDetails = (id, name) => {
        setShowDetails(true);
        setBeedId(id);
        setBeedName(name);
    }

    const loadBreadCrumbs = () => {
        AuthAction.updateBreadCrumbList({ apiKey: props.apiKey, links: ["Home", "BreedsList"] });
    }

    const deleteBreed= () => {
        alert("Sorry! Cant delete the Breed as its public data.")
    }

    const renderList = () => {
        return breedsList.map((breed, index) => {
            return (
                <tr key={index + props.aid}>
                    <td data-label="image" className="col0"><img src={breed.image && breed.image.url} /></td>
                    <td data-label="NAme" className="col2">{breed.name} <sup>
                        <a href={breed.wikipedia_url} target="_blank" rel="noreferrer"><i className="fas fa-info-circle"></i>
                        </a>
                    </sup>
                    </td>
                    <td data-label="Temperement" className="col2 elipse" title={breed.temperament}>{breed.temperament}</td>
                    <td data-label="Description" title={breed.description} className="col3 elipse">{breed.description}</td>
                    <td data-label="Origin">
                        <span className="margin12">
                            {breed.origin}
                        </span>
                    </td>
                    <td data-label="action">
                        <span className="margin12">
                            <i className="fas fa-eye" onClick={viewDetails.bind(null, breed.id, breed.name)}></i>
                            <i className="fas fa-trash-alt" onClick={deleteBreed}></i>
                        </span>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="breeds-list" id={props.aid}>
            {isLoading ? <AppLoader /> :
                showDetails ? <BreedDetails apiKey={props.apiKey} beedId={breedId} breedName={breedName} /> :
                    <>
                        {loadBreadCrumbs()}
                        <h3>Breeds List ({breedsList.length})</h3>
                        <table className="flex-table flex-fixhead-table">
                            <thead>
                                <tr>
                                    <th className="col0">Image</th>
                                    <th className="col2">Name</th>
                                    <th className="col2">Temperament</th>
                                    <th className="col3">Description</th>
                                    <th>Origin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderList()}
                            </tbody>
                        </table>
                    </>
            }
        </div >
    );
};
export default CatBreedsList;