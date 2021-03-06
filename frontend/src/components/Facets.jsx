import React from "react";
import '../bootstrap.min.css'
import CheckboxFacet from "./CheckboxFacet";


class Facets extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            facetInfo: null,
            error: null,
            expanded: false,
        };

        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    }


    componentDidMount() {
        fetch("http://localhost:8080/api/movies/facet-info")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        facetInfo: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    });
                }
            )
    }

    render() {
        if (!this.state.isLoaded) {
            return <div className="text-info">Loading...</div>
        }
        return (
            <div>
                <form>
                    <fieldset>
                        <CheckboxFacet facetName={"countries"}
                                       facetItems={this.state.facetInfo.countries}
                                       selectedItems={this.props.selectedItems['countries']}
                                       handleCheckboxClick={this.handleCheckboxClick}/>
                        <CheckboxFacet facetName={"genres"}
                                       facetItems={this.state.facetInfo.genres}
                                       selectedItems={this.props.selectedItems['genres']}
                                       handleCheckboxClick={this.handleCheckboxClick}/>
                        <CheckboxFacet facetName={"languages"}
                                       facetItems={this.state.facetInfo.languages}
                                       selectedItems={this.props.selectedItems['languages']}
                                       handleCheckboxClick={this.handleCheckboxClick}/>
                        <CheckboxFacet facetName={"rated"}
                                       facetItems={this.state.facetInfo.rated}
                                       selectedItems={this.props.selectedItems['rated']}
                                       handleCheckboxClick={this.handleCheckboxClick}/>
                    </fieldset>
                </form>
            </div>
        )
    }

    handleCheckboxClick(event, facetName) {
        let value = event.target.value;
        let newItems = this.props.selectedItems[facetName];
        newItems = newItems || [];
        if (newItems.includes(value)) {
            let index = newItems.indexOf(value);
            newItems.splice(index, 1);
        } else {
            newItems.push(value);
        }

        let newSelectedItems = this.props.selectedItems;
        newSelectedItems[facetName] = newItems;
        this.props.updateSelectedItems(newSelectedItems);
    }
}

export default Facets;