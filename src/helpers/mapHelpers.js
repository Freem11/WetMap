export default function  dataParams(Zoom, Lat, Lng) {
  let minLat;
  let maxLat;

  let minLng;
  let maxLng;

  switch (Zoom) {
    case 4:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 5:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 6:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 7:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 8:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 9:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 10:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 11:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 12:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 13:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 14:
      minLat = Lat - 0.1;
      maxLat = Lat + 0.1;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;
  }

  return {minLat, maxLat, minLng, maxLng};
};
