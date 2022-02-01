import axios from "axios";
import { GeoLocationConverter } from "../Converter/LocationConverter";

export const GetGeoLocationCommand = (longitude, latitude) => {
  return axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place&access_token=${process.env.REACT_APP_API_KEY}`
    )
    .then((res) => GeoLocationConverter(res.data));
};
