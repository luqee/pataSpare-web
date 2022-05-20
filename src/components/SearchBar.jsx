import React, { useEffect, useState } from 'react';
import {Container, Col, Form, Button} from 'react-bootstrap';
import Select from 'react-select';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { getBrands, getSearch } from '../api/api';
import { Navigate, useNavigate } from 'react-router-dom';

function SearchBar() {

    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [years, setYears] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [selectedModel, setSelectedModel] = useState(null)
    const [selectedYear, setSelectedYear] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(()=> {
        getBrands((brands) => {
            setBrands(brands)
        })
    }, [])

    
    const handleBrand = (selected) => {
        const found = brands.find((brand) => brand.id === parseInt(selected.value))
        if(found){
            setSelectedBrand(selected)
            setModels(found.models)
            setYears([])
            setSelectedModel(null)
            setSelectedYear(null)
        }
    }

    const handleModel = (selected) => {
        const found = models.find((model) => model.id === parseInt(selected.value))
        if(found){
            setSelectedModel(selected)
            setYears(found.years)
            setSelectedYear(null)
        }
    }

    const handleYear = (selected) => {
        setSelectedYear(selected)
    }

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }

    const navigate = useNavigate()
    const search = (event) => {
        event.preventDefault();
        let queryString = ''
        if(searchTerm !== ''){
            queryString = `term=${searchTerm}`
        }else{
            queryString = `term=none`
        }
        if(selectedBrand){
            queryString = queryString.concat(`&brand=${selectedBrand.value}`)
        }
        if(selectedModel){
            queryString = queryString.concat(`&model=${selectedModel.value}`)
        }
        if(selectedYear){
            queryString = queryString.concat(`&year=${selectedYear.value}`)
        }

        getSearch(queryString, (response) => {
            if (response.status === 200){
                let locationState = {
                    term: searchTerm,
                    results: response.data.data,
                }
                navigate(`/search?term=${searchTerm}`, {state: locationState})
            }
        })
    }
    let brandOptions = brands.map((brand) => {
        return {
            value: brand.id,
            label: brand.name
        }
    })
    brandOptions.sort((a, b) =>{
        let aLabel = a.label.toUpperCase()
        let bLabel = b.label.toUpperCase()
        if(aLabel < bLabel){
            return -1
        }
        if(aLabel > bLabel){
            return 1
        }
        return 0
    })

    let modelOptions = models.map((model) => {
        return {
            value: model.id,
            label: model.name
        }
    })
    modelOptions.sort((a, b) =>{
        let aLabel = a.label.toUpperCase()
        let bLabel = b.label.toUpperCase()
        if(aLabel < bLabel){
            return -1
        }
        if(aLabel > bLabel){
            return 1
        }
        return 0
    })

    let yearOptions = years.map((year) => {
        return {
            value: year.year,
            label: year.year
        }
    })
    
    return <Container id="searchBar" fluid css={css`
        @media (max-width: 768px){
            display: none;
        }
    `}>
        <Form inline style={{
                justifyContent: 'center',
                paddingTop: '5px '
            }}>
            <Form.Row style={{
                width: '80%',
            }}>
                <Col sm={3}>
                <Select
                    placeholder={`Select Make`}
                    options={brandOptions}
                    onChange={handleBrand}
                    value={selectedBrand}
                />
                </Col>
                <Col sm={3}>
                <Select
                    value={selectedModel}
                    placeholder={`Select Model`}
                    onChange={handleModel}
                    options={modelOptions}
                />
                </Col>
                <Col sm={3} >
                <Select
                    value={selectedYear}
                    placeholder={`Select Year`}
                    options={yearOptions}
                    onChange={handleYear}
                />
                </Col>
                <Col sm={3} >
                <Form.Group controlId="query" style={{
                    display: 'flex',
                    flexWrap:"nowrap"
                }}>
                    <Form.Control type="text" placeholder="Search" value={searchTerm} className="me-sm-2" onChange={handleSearchInput} />
                    <Button type="submit" onClick={search}>Search</Button>
                </Form.Group>

                </Col>
            </Form.Row>
        </Form>
    </Container>
}

export default SearchBar;
