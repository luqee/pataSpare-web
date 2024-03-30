'use client'
import { use, useEffect, useState } from 'react';
import {Container, Col, Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import { getBrands, getSearch } from '@/utils/api';
import { useRouter } from 'next/navigation';
import {SearchForm, Search} from "@/styles/Search.module.css";

export const SearchBar = ()=>{
    const [brands, setBrands] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [models, setModels] = useState([])
    const [modelOptions, setModelOptions] = useState([])
    const [years, setYears] = useState([])
    const [yearOptions, setYearOptions] = useState([])

    const [brand, setBrand] = useState(null)
    const [model, setModel] = useState(null)
    const [year, setYear] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(()=>{
        fetchBrands()
    }, [])

    const fetchBrands = () => {
        getBrands()
        .then((response) => {
            if (response.status === 200){
                setBrands(response.data.data.brands)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleBrand = (selected) => {
        setBrand(selected);
        brands.forEach((brand) => {
            if (brand.id === parseInt(selected.value)){
                setModels(brand.models);
                setYears([]);
            }
        })
        setModel(null)
        setYear(null)
    }

    const handleModel = (selected) => {
        setModel(selected)
        models.forEach((model) => {
            if (model.id === parseInt(selected.value)){
                setYears(model.years)
            }
        })
        setYear(null)
    }

    const handleYear = (selected) => {
        setYear(selected)
    }

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }
    const router = useRouter()
    const search = (event) => {
        event.preventDefault();
        const searchParams = new URLSearchParams()
        if(searchTerm !== ''){
            searchParams.append('term', searchTerm)
        }
        if(brand){
            searchParams.append('brand', brand.value)
        }
        if(model){
            searchParams.append('model', model.value)
        }
        if(year){
            searchParams.append('year', year.value)
        }

        getSearch(searchParams)
        .then((response) => {
            if (response.data.status === 200){
                // let path = {
                //     pathname: `/results`,
                //     state: {
                //         results: response.data.data,
                //         term: searchTerm
                //     }
                // }
                setBrand(null)
                setModel(null)
                setYear(null)
                setSearchTerm('')
                router.push('/results')
            }
        })
        .catch((error) => {
            console.log(error);

        });
    }

    useEffect(()=>{
        setUpBrandOptions()
    }, [brands])

    useEffect(()=>{
        setupModelOptions()
    }, [models])

    useEffect(()=>{
        setUpYearOptions()
    }, [years])

    const setUpBrandOptions = ()=>{
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
        setBrandOptions(brandOptions)
    }

    const setupModelOptions = ()=>{
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
        setModelOptions(modelOptions)
    }

    const setUpYearOptions = ()=>{
        let yearOptions = years.map((year) => {
            return {
                value: year.year,
                label: year.year
            }
        })
        setYearOptions(yearOptions)
    }


    return <>
    <Container className={Search} id="searchBar" fluid>
    <Form className={SearchForm}>
        <Form.Group>
        <Select
            instanceId={'make'}
                placeholder={`Select Make`}
                options={brandOptions}
                onChange={handleBrand}
                value={brand}
            />
        </Form.Group>
        <Form.Group>
        <Select
            instanceId={'model'}
                value={model}
                placeholder={`Select Model`}
                onChange={handleModel}
                options={modelOptions}
            />
        </Form.Group>
        <Form.Group>
        <Select
            instanceId={'year'}
                value={year}
                placeholder={`Select Year`}
                options={yearOptions}
                onChange={handleYear}
            />
        </Form.Group>
        <Form.Group controlId="query" style={{
                display: 'flex',
                flexWrap:"nowrap"
            }}>
                <Form.Control type="text" placeholder="Search" value={searchTerm} className=" mr-sm-2" onChange={handleSearchInput} />
                <Button type="submit" onClick={search}>Search</Button>
            </Form.Group>
    </Form>
    </Container>
    </>
}