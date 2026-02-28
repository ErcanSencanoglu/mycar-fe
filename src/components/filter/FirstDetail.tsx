import React from "react";
import { Item } from "../../models/ItemModels";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
interface FirstDetailProps {
  item: Item;
}

function FirstDetail({ item }: FirstDetailProps) {
  const photos: string[] = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
    "https://build.ford.com/dig/Ford/Mustang/2024/HD-TILE/Image%5B%7CFord%7CMustang%7C2024%7C1%7C1.%7C300A.P8C..PHY..88D.89W.~2WD00_BCMAB.AC--C.13R.COU.BSHEH.BYBBR.CJPAA.LTS.51W.64T.TA6.RWD.45D.99F.FS--A.HLLAD.58V.IDBAD.SY4.44X.GT.YZTAB.CLO.%5D/EXT/1/vehicle.png",
  ];
  return (
    <div>
      <Container
        sx={{
          background: item.advertisementDates.highlighToday
            ? "#E0F7FA"
            : "white",
          display: "flex", // Use flexbox for layout
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens, horizontally on medium and up
          justifyContent: { xs: "center", md: "space-between" }, // Space between items
          alignItems: "center", // Align items vertically center
          borderTop: "3px solid #FFDB4D",
          padding: { sx: 1, sm: 2 },
          gap: { sx: 1, sm: 2 },
          transition: "all 0.3s ease", // Smooth transitions for all properties
          "&:hover": {
            background: "#f0f0f0", // Optional hover background color
            boxShadow: `0 4px 8px 0 rgba(228, 0, 48, 0.2)`, // Hover shadow with the color
            cursor: "pointer", // Pointer cursor on hover
          },

          position: "relative",
          overflow: "hidden",
        }}
      >
        <Carousel
          indicatorContainerProps={{
            style: {
              position: "absolute",
              bottom: "10px", // Adjust position from the bottom
              zIndex: 10, // Ensure indicators appear on top
            },
          }}
          indicators={true}
          fullHeightHover={true}
          // navButtonsAlwaysVisible={true}
          sx={{
            width: { xs: 240, sm: 300, md: 300 },
            height: { xs: 180, sm: 225, md: 225 },
            order: 1,
          }}
          autoPlay={false}
        >
          {photos.map((item, i) => (
            <Box
              sx={{
                width: { xs: 240, sm: 300, md: 300 },
                height: { xs: 180, sm: 225, md: 225 },
                objectFit: "contain", // Make sure the image covers the area without distortion
                objectPosition: "center", // Center the image within the Carousel
              }}
              loading="lazy"
              component="img"
              src={item}
            />
          ))}
        </Carousel>

        <Grid
          container
          sx={{
            flex: 1,
            margin: (theme) => theme.spacing(1),
            order: { xs: 3, sm: 2 },
            gap: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">
              {item.title
                ? item.title
                : "${item.marka} - ${item.model}" + item.version
                ? item.version
                : ""}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
              },
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Typography variant="subtitle1">KM: {item.km}</Typography>
            <Typography variant="subtitle1">Year: {item.year}</Typography>
            <Typography variant="subtitle1">Fuel: {item.fuelType}</Typography>
            <Typography variant="subtitle1">Gear: {item.gearType}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" size="small" color="primary" disabled>
                Tag1
              </Button>
              <Button variant="contained" size="small" color="primary" disabled>
                Tag2
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Location: {item.location}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {item.location} Date: 01.01.2024
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            position: { xs: "relative", sm: "absolute" },
            top: (theme) => theme.spacing(0),
            bottom: (theme) => theme.spacing(0),
            right: (theme) => theme.spacing(0),
            display: "flex",
            zIndex: 20, // Ensuring it's on top of other content
            order: { xs: 2, sm: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "flex-end" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "end",
                gap: (theme) => theme.spacing(1),
                order: { xs: 2, sm: 1 },
              }}
            >
              <IconButton
                aria-label="Add to favorites"
                style={{ borderRadius: 0 }}
                sx={{
                  color: "rgba(228, 0, 48, 0.6)",
                  background: "#FFDB4D",
                }}
              >
                <CompareOutlinedIcon
                  sx={{ fontSize: { xs: 18, sm: 24, md: 32 } }}
                />
              </IconButton>

              <IconButton
                style={{ borderRadius: 0 }}
                aria-label="Comapre"
                sx={{
                  color: "rgba(228, 0, 48, 0.6)",
                  background: "#FFDB4D",
                }}
              >
                <FavoriteBorderIcon
                  sx={{ fontSize: { xs: 18, sm: 24, md: 32 } }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                gap: (theme) => theme.spacing(1),
                padding: {
                  xs: 1,
                  sm: 2,
                },
                marginBottom: {
                  xs: 0, // theme.spacing(1)
                  sm: 2, // theme.spacing(2)
                },
                order: { xs: 1, sm: 2 },
              }}
            >
              <Typography variant="h6">{item.price}0000 PLN</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default FirstDetail;
/**
 * 
 *     <div style={{background:'black', height: '100%', margin:'5'}}>
          150000 pln <div>below the price</div>
        </div>
 */

/*
          <Box
          sx={{
            marginTop: 'auto', // Push price to the bottom
            textAlign: 'center',
          }}
        >
          150000 PLN
          <div>below the price</div>
        </Box>
        
        */
