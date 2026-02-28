import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
  Collapse,
  useMediaQuery,
  Pagination,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { FilterFormData, Range } from "../../models/FilterModel";
import { fetchBrandsAndModels } from "../../slices/BrandModelSlice";
import { replaceFormData, setFormData } from "../../slices/FilterFormDataSlice";
import { Model, Version } from "../../models/BrandModelModels";
import { fetchItems } from "../../slices/FilterItemSlice";
import { fetchItemCount } from "../../slices/FetchItemCountSlice";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme } from '@mui/material/styles';


function FilterDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const isInitialMount = useRef(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const brandModelState = useSelector((state: RootState) => state.brandModel);
  const { data, loading, error } = brandModelState;

  const [models, setModels] = useState<Model[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);

  const priceOptions = ["10000", "20000", "30000", "40000", "50000"];
  const yearOptions = ["2020", "2021", "2022", "2023"];
  const kmOptions = ["0", "10000", "500000", "100000", "1500000", "200000"];
  const bodyTypeOptions = ["Hactback", "Sedan", "Cabrio"];
  const fuelTypeOptions = ["Diesel", "Benzine", "Hybrid", "Electric"];
  const gearTypeOptions = ["Manual", "Automatic"];
  const colorOptions = ["Red", "Blue", "Black", "White"];
  const locationOptions = ["Krakow", "Warsaw", "Lodz", "Gdansk"];
  const horsePowerOptions = [
    "50",
    "100",
    "150",
    "200",
    "250",
    "300",
    "400",
    "500",
    "750",
    "1000",
  ];
  const engineCapacityOptions = [
    "700",
    ",1000",
    "1200",
    "1500",
    "1900",
    "1999",
    "2300",
    "2700",
    "3000",
    "50000",
  ];
  const producedCountryOptions = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Congo (Democratic Republic)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkiye",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const filterFormData = useSelector(
    (state: RootState) => state.filterFormData
  );

  const fetchItemCountState = useSelector(
    (state: RootState) => state.fetchItemCount
  );

  useEffect(() => {
    dispatch(fetchBrandsAndModels());
    dispatch(replaceFormData({ item_type: "CAR" }));
    console.log("Filter data on start >>>>>>", filterFormData);
    if (filterFormData.data?.marka) {
      handleBrandChange(null, String(filterFormData.data.marka));
      if (filterFormData.data?.model) {
        handleModelChange(null, String(filterFormData.data.model));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (filterFormData.data) {
      filterFormData.data &&
        filterFormData.data.item_type &&
        dispatch(fetchItemCount(filterFormData.data));
    }
  }, [filterFormData]);

  const updateFilterFormData = (formData: Partial<FilterFormData>) => {
    dispatch(setFormData(formData));
    console.log("Filter data >>>>>>", filterFormData);
  };

  const handleBrandChange = (event: any, newValue: string | null) => {
    const brandName = newValue;
    console.log("brand value", filterFormData.data?.marka);
    const selectedBrandData = data.find((brand) => brand.name === brandName);
    if (selectedBrandData) {
      setModels(selectedBrandData.models);
    } else {
      setModels([]);
      setVersions([]);
    }
    updateFilterFormData({
      marka: brandName ? brandName : undefined,
      model: undefined,
      version: undefined,
    });
  };

  const handleModelChange = (event: any, newValue: string | null) => {
    const modelName = newValue;
    const selectedModelData = models.find((model) => model.name === modelName);
    if (selectedModelData) {
      setVersions(selectedModelData.versions);
    } else {
      setVersions([]);
    }
    updateFilterFormData({
      model: modelName ? newValue : undefined,
      version: undefined,
    });
  };

  // it doesn't allow to be empty, we should add same for year
  const handleYearChange = (event: any, newValue: string | null) => {
    const year = newValue!;
    if (/^(?:[1-9][0-9]{0,3}|0)$/.test(year)) {
      console.log("valid");
    } else {
      console.log(
        "Invalid input: Must be a number between 1 and 9999 without leading zeros."
      );
    }
  };

  const handleDefaultFormValueChange = (
    field: keyof FilterFormData,
    event: any,
    newValue: String | null | undefined
  ) => {
    updateFilterFormData({
      [field]: newValue, // for now adding only one value but in future might be added as multiple choice
    });
  };

  const handleDefaultFormArrayValueChange = (
    field: keyof FilterFormData,
    event: any,
    newValue: String | null
  ) => {
    updateFilterFormData({
      [field]: newValue === null || newValue === "" ? undefined : [newValue], // for now adding only one value but in future might be added as multiple choice
    });
  };

  const handleDefaultFormBooleanValueChange = (
    field: keyof FilterFormData,
    event: any,
    newValue: boolean | null | undefined
  ) => {
    updateFilterFormData({
      [field]: newValue, // for now adding only one value but in future might be added as multiple choice
    });
  };

  const handleRangeInputBlur =
    (field: keyof FilterFormData, position: "START" | "END") =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      const currentFieldData =
        ((filterFormData.data && filterFormData.data[field]) as Range) || {};

      updateFilterFormData({
        [field]: {
          ...currentFieldData,
          [position.toLowerCase()]: value && value > 0 ? value : undefined,
        },
      });
    };

  const handleRangeInputKeyDown =
    (field: keyof FilterFormData, position: "START" | "END") =>
    (event: any) => {
      if (event.key === "Enter") {
        const inputElement = event.target as HTMLInputElement;
        const value = Number(inputElement.value);

        const currentFieldData =
          ((filterFormData.data && filterFormData.data[field]) as Range) || {};

        updateFilterFormData({
          [field]: {
            ...currentFieldData,
            [position.toLowerCase()]: value && value > 0 ? value : undefined,
          },
        });
      }
    };

  const handleSubmit = () => {
    filterFormData.data && dispatch(fetchItems(filterFormData.data));
  };

  const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility

  const handleToggle = () => {
    setShowDetails((prev) => !prev); // Toggle the details section
  };
  return (
    <Container
      sx={{
        maxWidth: {
          xs: "lg",
          sm: "lg",
          md: "lg",
          lg: "lg",
          xl: "lg",
        },
        padding: (theme) => theme.spacing(2),

        display: "flex",
        flexDirection: "column",
        gap: (theme) => theme.spacing(2),

        border: "1px solid lightGrey",
        borderRadius: 1,
      }}
    >
      <form>
        <Grid container columnSpacing={2} rowSpacing={1}>
          {/*1ST Line*****************/}
          <Grid item xs={6} sm={3} md={2}>
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
                    placeholder="Search Brand"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
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
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="vehicle_version"
                disabled={!filterFormData.data?.model}
                options={versions.map((version) => {
                  return version.name;
                })}
                value={filterFormData.data?.version || null}
                onChange={(event, newValue) =>
                  updateFilterFormData({
                    version: newValue ? newValue : undefined,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Version" />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="vehicleCaseType-label">Body Type</InputLabel>
              <Select
                labelId="vehicleCaseType-label"
                id="vehicleCaseType"
                value={filterFormData.data?.vehicle_case_type || ""}
                onChange={(event) =>
                  handleDefaultFormValueChange(
                    "vehicle_case_type",
                    event,
                    event.target.value
                  )
                } // Use target.value for Select
                label="Body Type"
                endAdornment={
                  filterFormData.data?.vehicle_case_type && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleDefaultFormValueChange(
                            "vehicle_case_type",
                            null,
                            undefined
                          )
                        }
                        edge="end"
                        sx={{
                          width: "28px",
                          height: "28px",
                          padding: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <ClearIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              >
                {bodyTypeOptions.map((bodyType) => (
                  <MenuItem key={bodyType} value={bodyType}>
                    {bodyType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="fuelType-label">Fuel Type</InputLabel>
              <Select
                labelId="fuelType-label"
                id="fuelType"
                value={filterFormData.data?.fuel_type || ""}
                onChange={(event) =>
                  handleDefaultFormArrayValueChange(
                    "fuel_type",
                    event,
                    String(event.target.value) // for now adding only one value but in future might be added as multiple choice
                  )
                } // Use target.value for Select
                label="Fuel Type"
                endAdornment={
                  filterFormData.data?.fuel_type && (
                    <InputAdornment position="end" sx={{ marginRight: 1 }}>
                      <IconButton
                        onClick={() =>
                          handleDefaultFormArrayValueChange(
                            "fuel_type",
                            null,
                            null
                          )
                        }
                        edge="end"
                        sx={{
                          width: "28px",
                          height: "28px",
                          padding: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <ClearIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              >
                {fuelTypeOptions.map((fuelType) => (
                  <MenuItem key={fuelType} value={fuelType}>
                    {fuelType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="gearType-label">Gear Type</InputLabel>
              <Select
                labelId="gearType-label"
                id="gearType"
                value={filterFormData.data?.gear_type || ""}
                onChange={(event) =>
                  handleDefaultFormArrayValueChange(
                    "gear_type",
                    event,
                    String(event.target.value) // for now adding only one value but in future might be added as multiple choice
                  )
                } // Use target.value for Select
                label="Gear Type"
                endAdornment={
                  filterFormData.data?.gear_type && (
                    <InputAdornment position="end" sx={{ marginRight: 1 }}>
                      <IconButton
                        onClick={() =>
                          handleDefaultFormArrayValueChange(
                            "gear_type",
                            null,
                            null
                          )
                        }
                        edge="end"
                        sx={{
                          width: "28px",
                          height: "28px",
                          padding: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <ClearIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              >
                {gearTypeOptions.map((gearType) => (
                  <MenuItem key={gearType} value={gearType}>
                    {gearType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/******2N LINE******/}
          {(!isSmallScreen || showDetails) &&(  <>

          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="min_price"
                freeSolo
                options={priceOptions}
                value={
                  filterFormData.data?.price?.start !== undefined
                    ? String(filterFormData.data.price.start)
                    : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="Min Price" />
                )}
                // onChange={handlePriceChange}
                onBlur={handleRangeInputBlur("price", "START")}
                onKeyDown={handleRangeInputKeyDown("price", "START")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="max_price"
                freeSolo
                options={priceOptions}
                value={
                  filterFormData.data?.price?.end !== undefined
                    ? String(filterFormData.data.price.end)
                    : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="Max Price" />
                )}
                // onChange={handlePriceChange}
                onBlur={handleRangeInputBlur("price", "END")}
                onKeyDown={handleRangeInputKeyDown("price", "END")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="min_year"
                freeSolo
                options={yearOptions}
                value={
                  filterFormData.data?.year?.start !== undefined
                    ? String(filterFormData.data.year.start)
                    : ""
                }
                //inputValue={year}
                renderInput={(params) => (
                  <TextField {...params} label="Min Year" />
                )}
                onInputChange={handleYearChange}
                onBlur={handleRangeInputBlur("year", "START")}
                onKeyDown={handleRangeInputKeyDown("year", "START")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="max_year"
                freeSolo
                options={yearOptions}
                value={
                  filterFormData.data?.year?.end !== undefined
                    ? String(filterFormData.data.year.end)
                    : ""
                }
                //inputValue={year}
                renderInput={(params) => (
                  <TextField {...params} label="Max Year" />
                )}
                onInputChange={handleYearChange}
                onBlur={handleRangeInputBlur("year", "END")}
                onKeyDown={handleRangeInputKeyDown("year", "END")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="min_km"
                freeSolo
                options={kmOptions}
                value={
                  filterFormData.data?.km?.start !== undefined
                    ? String(filterFormData.data.km.start)
                    : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="Min KM" />
                )}
                onInputChange={handleYearChange}
                onBlur={handleRangeInputBlur("km", "START")}
                onKeyDown={handleRangeInputKeyDown("km", "START")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="max_km"
                freeSolo
                options={kmOptions}
                value={
                  filterFormData.data?.km?.end !== undefined
                    ? String(filterFormData.data.km.end)
                    : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="Max KM" />
                )}
                onInputChange={handleYearChange}
                onBlur={handleRangeInputBlur("km", "END")}
                onKeyDown={handleRangeInputKeyDown("km", "END")}
              />
            </FormControl>
          </Grid>
        </>)}
          {/*3RD and 4TH LINE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
          <Grid item xs={12}>
            <Collapse in={showDetails} timeout="auto" unmountOnExit>
              <Grid item xs={12} container columnSpacing={2} rowSpacing={1}>
                {/*Color*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="color-label">Color</InputLabel>
                    <Select
                      labelId="color-label"
                      id="color"
                      value={filterFormData.data?.colors || ""}
                      onChange={(event) =>
                        handleDefaultFormArrayValueChange(
                          "colors",
                          event,
                          String(event.target.value)
                        )
                      } // Use target.value for Select
                      label="Color"
                      endAdornment={
                        filterFormData.data?.colors && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                handleDefaultFormArrayValueChange(
                                  "colors",
                                  null,
                                  null
                                )
                              }
                              edge="end"
                              sx={{
                                width: "28px",
                                height: "28px",
                                padding: "4px",
                                marginRight: "12px",
                              }}
                            >
                              <ClearIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    >
                      {colorOptions.map((color) => (
                        <MenuItem key={color} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/*Location*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      id="location"
                      value={filterFormData.data?.location || ""}
                      onChange={(event) =>
                        handleDefaultFormValueChange(
                          "location",
                          event,
                          event.target.value
                        )
                      } // Use target.value for Select
                      label="Color"
                      endAdornment={
                        filterFormData.data?.location && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                handleDefaultFormValueChange(
                                  "location",
                                  null,
                                  undefined
                                )
                              }
                              edge="end"
                              sx={{
                                width: "28px",
                                height: "28px",
                                padding: "4px",
                                marginRight: "12px",
                              }}
                            >
                              <ClearIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    >
                      {locationOptions.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/*Min Horse Power*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="min_horsepower"
                      freeSolo
                      options={horsePowerOptions}
                      value={
                        filterFormData.data?.horse_power?.start !== undefined
                          ? String(filterFormData.data.horse_power.start)
                          : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Min HP" />
                      )}
                      onBlur={handleRangeInputBlur("horse_power", "START")}
                      onKeyDown={handleRangeInputKeyDown(
                        "horse_power",
                        "START"
                      )}
                    />
                  </FormControl>
                </Grid>
                {/*Max Horse Power*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="max_horsepower"
                      freeSolo
                      options={horsePowerOptions}
                      value={
                        filterFormData.data?.horse_power?.end !== undefined
                          ? String(filterFormData.data.horse_power.end)
                          : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Max HP" />
                      )}
                      onBlur={handleRangeInputBlur("horse_power", "END")}
                      onKeyDown={handleRangeInputKeyDown("horse_power", "END")}
                    />
                  </FormControl>
                </Grid>
                {/*Min Engine Capacity*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="min_enginecapacity"
                      freeSolo
                      options={engineCapacityOptions}
                      value={
                        filterFormData.data?.engine_capacity?.start !==
                        undefined
                          ? String(filterFormData.data.engine_capacity.start)
                          : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Min CC" />
                      )}
                      onBlur={handleRangeInputBlur("engine_capacity", "START")}
                      onKeyDown={handleRangeInputKeyDown(
                        "engine_capacity",
                        "START"
                      )}
                    />
                  </FormControl>
                </Grid>
                {/*Max Engine Capacity*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="max_enginecapacity"
                      freeSolo
                      options={engineCapacityOptions}
                      value={
                        filterFormData.data?.engine_capacity?.end !== undefined
                          ? String(filterFormData.data.engine_capacity.end)
                          : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Max CC" />
                      )}
                      onBlur={handleRangeInputBlur("engine_capacity", "END")}
                      onKeyDown={handleRangeInputKeyDown(
                        "engine_capacity",
                        "END"
                      )}
                    />
                  </FormControl>
                </Grid>
                {/*IsUsed*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="isUSed-label">Is Used</InputLabel>
                    <Select
                      labelId="isUsed-label"
                      id="isUsed"
                      value={
                        filterFormData.data?.is_used === undefined ||
                        filterFormData.data?.is_used == null
                          ? "none"
                          : filterFormData.data?.is_used
                      }
                      onChange={(event) =>
                        handleDefaultFormBooleanValueChange(
                          "is_used",
                          event,
                          event.target.value === "true"
                            ? true
                            : event.target.value === "false"
                            ? false
                            : undefined
                        )
                      }
                      label="isUsed"
                    >
                      <MenuItem value="none">Any</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/*Damaged*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="damaged-label">Damaged</InputLabel>
                    <Select
                      labelId="damaged-label"
                      id="damaged"
                      value={
                        filterFormData.data?.damaged === undefined ||
                        filterFormData.data?.damaged == null
                          ? "none"
                          : filterFormData.data?.damaged
                      }
                      onChange={(event) =>
                        handleDefaultFormBooleanValueChange(
                          "damaged",
                          event,
                          event.target.value === "true"
                            ? true
                            : event.target.value === "false"
                            ? false
                            : undefined
                        )
                      }
                      label="Damaged"
                    >
                      <MenuItem value="none">Any</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/*Imported*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="imported-label">Imported</InputLabel>
                    <Select
                      labelId="imported-label"
                      id="imported"
                      value={
                        filterFormData.data?.imported === undefined ||
                        filterFormData.data?.imported == null
                          ? "none"
                          : filterFormData.data?.imported
                      }
                      onChange={(event) =>
                        handleDefaultFormBooleanValueChange(
                          "imported",
                          event,
                          event.target.value === "true"
                            ? true
                            : event.target.value === "false"
                            ? false
                            : undefined
                        )
                      }
                      label="Imported"
                    >
                      <MenuItem value="none">Any</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/*Registered*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="registered-label">Registired</InputLabel>
                    <Select
                      labelId="registered-label"
                      id="registered"
                      value={
                        filterFormData.data?.registered === undefined ||
                        filterFormData.data?.registered == null
                          ? "none"
                          : filterFormData.data?.registered
                      }
                      onChange={(event) =>
                        handleDefaultFormBooleanValueChange(
                          "registered",
                          event,
                          event.target.value === "true"
                            ? true
                            : event.target.value === "false"
                            ? false
                            : undefined
                        )
                      }
                      label="registered"
                    >
                      <MenuItem value="none">Any</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/*Produced Country*/
                /*it should be multiple choice*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="producedCountry"
                      options={producedCountryOptions.map((country) => {
                        return country;
                      })}
                      value={filterFormData.data?.produced_country || null}
                      onChange={(
                        event: React.SyntheticEvent,
                        newValue: String | null
                      ) =>
                        handleDefaultFormValueChange(
                          "produced_country",
                          event,
                          newValue
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Produced Country"
                          placeholder="Search Country"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/*WithPhoto*/}
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="withPhoto-label">With Photo</InputLabel>
                    <Select
                      labelId="withPhoto-label"
                      id="withPhoto"
                      value={
                        filterFormData.data?.with_photo === undefined ||
                        filterFormData.data?.with_photo == null
                          ? "none"
                          : filterFormData.data?.with_photo
                      }
                      onChange={(event) =>
                        handleDefaultFormBooleanValueChange(
                          "with_photo",
                          event,
                          event.target.value === "true" ? true : undefined
                        )
                      }
                      label="withPhoto"
                    >
                      <MenuItem value="none">Any</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>

          {/*Buttons!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
          {/*More Details Button*/}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              marginLeft: "auto", // Push the child grid to the right end of the parent grid
            }}
          >
            <Button
              variant="outlined"
              onClick={handleToggle}
              sx={{
                fontSize: "0.9rem",
                width: "100%",
                height: "100%",
                minHeight: "56px",
                borderColor: "#E40030", // Match border color with the background of the contained button
                color: "#E40030", // Match text color with the background of the contained button
                "&:hover": {
                  borderColor: "#C8012B", // Change the border color on hover
                  backgroundColor: "#FDE2E4", // Light background color on hover (optional)
                  color: "#C8012B", // Match hover text color
                },}}
              endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
            >
              {showDetails ? "Less Details" : "More Details"}
            </Button>
          </Grid>
          {/*Search Button*/}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              marginLeft: 0, // Push the child grid to the right end of the parent grid
            }}
          >
            <FormControl fullWidth>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  fontSize: "0.9rem",
                  width: "100%",
                  height: "100%",
                  minHeight: "56px",
                  background: "#E40030",
                  "&:hover": {
                    backgroundColor: "#C8012B", // Background color on hover
                  },
                }}
              >
                {fetchItemCountState.data !== null &&
                fetchItemCountState.data !== undefined
                  ? `Search - ${String(fetchItemCountState.data)} Matches`
                  : "Search"}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        <Pagination count={10} variant="outlined" size="medium" shape="rounded" color="secondary"/>
      </form>
    </Container>
  );
}

export default FilterDetails;

// other filters will be added with card (sorting,pagination, how many item should be listed in a page)
// small screens will be checked and modified with card for details
// add number validation for horse power, engine capacity ,price
// save the search button
