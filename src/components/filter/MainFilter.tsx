import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import BrandModelSlice, {
  fetchBrandsAndModels,
} from "../../slices/BrandModelSlice";
import { Model } from "../../models/BrandModelModels";
import { start } from "repl";
import { fetchItems } from "../../slices/FilterItemSlice";
import { useNavigate } from "react-router-dom";
import { FilterFormData } from "../../models/FilterModel";
import { setFormData, replaceFormData } from "../../slices/FilterFormDataSlice";
import { fetchItemCount } from "../../slices/FetchItemCountSlice";
import {
  TextField,
  Container,
  FormControl,
  Box,
  Autocomplete,
  Grid,
  Button,
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function MainFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  const brandModelState = useSelector((state: RootState) => state.brandModel);
  const filterFormData = useSelector(
    (state: RootState) => state.filterFormData
  );
  const fetchItemCountState = useSelector(
    (state: RootState) => state.fetchItemCount
  );

  const { data, loading, error } = brandModelState;

  // const [selectedBrand, setSelectedBrand] = useState("");
  //const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [price, setPrice] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const priceOptions = ["10000", "20000", "30000", "40000", "50000"];
  const yearOptions = ["2020", "2021", "2022", "2023"];

  useEffect(() => {
    dispatch(fetchBrandsAndModels());
    dispatch(replaceFormData({ item_type: "CAR" }));
  }, [dispatch]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (filterFormData.data) {
      filterFormData.data &&
        filterFormData.data.item_type &&
        dispatch(fetchItemCount(filterFormData.data));
    }
  }, [filterFormData, dispatch]);

  const updateFilterFormData = (formData: Partial<FilterFormData>) => {
    dispatch(setFormData(formData));
  };

  const handleBrandChange = (event: any, newValue: string | null) => {
    const brandName = newValue;

    const selectedBrandData = data.find((brand) => brand.name === brandName);
    if (selectedBrandData) {
      setModels(selectedBrandData.models);
    } else {
      setModels([]);
    }
    updateFilterFormData({ marka: brandName!, model: undefined });
  };

  const handleModelChange = (event: any, newValue: string | null) => {
    const modelName = newValue;
    updateFilterFormData({ model: modelName! });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;
    setPrice(price);
  };

  const handleYearChange = (event: any, newValue: string | null) => {
    const year = newValue!;

    if (/^(?:[1-9][0-9]{0,3}|0)$/.test(year)) {
      console.log("valid");
      setYear(year);
    } else {
      console.log(
        "Invalid input: Must be a number between 1 and 9999 without leading zeros."
      );
    }
  };

  const handleRangeInputBlur =
    (field: keyof FilterFormData) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      updateFilterFormData({
        [field]: { end: value && value > 0 ? value : undefined },
      });
    };

  const handleRangeInputKeyDown =
    (field: keyof FilterFormData) => (event: any) => {
      if (event.key === "Enter") {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        updateFilterFormData({ [field]: { end: Number(value) } });
      }
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/filter");
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
        sx={{
          pb: (theme) => theme.spacing(10),
        }}
      >
        <form style={{ width: "100%" }}>
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <Autocomplete
                  id="brand"
                  options={data.map((brand) => {
                    return brand.name;
                  })}
                  value={filterFormData.data?.marka || null}
                  onChange={handleBrandChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand"
                      placeholder="Search your country"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <Autocomplete
                  id="model"
                  disabled={!filterFormData.data?.marka}
                  options={models.map((model) => {
                    return model.name;
                  })}
                  value={filterFormData.data?.model || null}
                  onChange={handleModelChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Model" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <Autocomplete
                  id="price"
                  freeSolo
                  options={priceOptions}
                  value={price}
                  renderInput={(params) => (
                    <TextField {...params} label="Max Price" />
                  )}
                  // onChange={handlePriceChange}
                  onBlur={handleRangeInputBlur("price")}
                  onKeyDown={handleRangeInputKeyDown("price")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <Autocomplete
                  id="year"
                  freeSolo
                  options={yearOptions}
                  value={year}
                  inputValue={year}
                  renderInput={(params) => (
                    <TextField {...params} label="Max Year" />
                  )}
                  onInputChange={handleYearChange}
                  onBlur={handleRangeInputBlur("year")}
                  onKeyDown={handleRangeInputKeyDown("year")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
     
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <Button variant="contained" onClick={handleSubmit} size="large">
                  {fetchItemCountState.data !== null &&
                  fetchItemCountState.data !== undefined
                    ? `Search - ${String(fetchItemCountState.data)} Matches`
                    : "Search"}
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth sx={{height:'100%'}}>
                <Button variant="contained" fullWidth sx={{height:'100%'}} size="large" endIcon={<MoreHorizIcon sx={{ ml: 1 }}/>}>
                  More Filters
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default MainFilter;
