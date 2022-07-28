function dataParams(Zoom, Lat, Lng) {
  let minLat;
  let maxLat;

  let minLng;
  let maxLng;

  switch (Zoom) {
    case 4:
      minLat = Lat - 35;
      maxLat = Lat + 35;
      minLng = Lng - 56;
      maxLng = Lng + 56;
      break;

    case 5:
      minLat = Lat - 17.5;
      maxLat = Lat + 17.5;
      minLng = Lng - 30;
      maxLng = Lng + 30;
      break;

    case 6:
      minLat = Lat - 9;
      maxLat = Lat + 9;
      minLng = Lng - 10;
      maxLng = Lng + 10;
      break;

    case 7:
      minLat = Lat - 4;
      maxLat = Lat + 4;
      minLng = Lng - 7;
      maxLng = Lng + 7;
      break;

    case 8:
      minLat = Lat - 2;
      maxLat = Lat + 2;
      minLng = Lng - 3.5;
      maxLng = Lng + 3.5;
      break;

    case 9:
      minLat = Lat - 1;
      maxLat = Lat + 1;
      minLng = Lng - 2;
      maxLng = Lng + 2;
      break;

    case 10:
      minLat = Lat - 0.5;
      maxLat = Lat + 0.5;
      minLng = Lng - 1;
      maxLng = Lng + 1;
      break;

    case 11:
      minLat = Lat - 0.5;
      maxLat = Lat + 0.5;
      minLng = Lng - 0.5;
      maxLng = Lng + 0.5;
      break;

    case 12:
      minLat = Lat - 0.15;
      maxLat = Lat + 0.15;
      minLng = Lng - 0.25;
      maxLng = Lng + 0.25;
      break;

    case 13:
      minLat = Lat - 0.07;
      maxLat = Lat + 0.07;
      minLng = Lng - 0.1;
      maxLng = Lng + 0.1;
      break;

    case 14:
      minLat = Lat - 0.02;
      maxLat = Lat + 0.02;
      minLng = Lng - 0.06;
      maxLng = Lng + 0.06;
      break;
  }

  return { minLat, maxLat, minLng, maxLng };
}

function filterSites(newParams, array) {

  let newArr = [];
  array.forEach((diveSite) => {
    if (
      diveSite.lat > newParams.minLat &&
      diveSite.lat < newParams.maxLat &&
      diveSite.lng > newParams.minLng &&
      diveSite.lng < newParams.maxLng
    ) {
      newArr.push(diveSite);
    }
  });
  return newArr;
}

function filterHeat(month, animal,  array) {

let actualMonth = month + 1

  let newArr = [];
  array.forEach((heatDot) => {
    if (animal === 'None') {
      if (heatDot.month === actualMonth ) {
        newArr.push(heatDot);
      }
    } else {
      if (heatDot.month === actualMonth & heatDot.animal === animal) {
        newArr.push(heatDot);
      }
    }  
  });
  return newArr;
}

function setupMapValues(zoomLevel, latitude, longitude, diveSites, heatValues, slider, animal){
 
  let GPSBubble = dataParams(zoomLevel, latitude, longitude)
  let diveSpots = filterSites(GPSBubble, diveSites)

  let heatSpots

  if (heatValues) {
    heatSpots = filterHeat(slider, animal, filterSites(GPSBubble, heatValues))
  } else {
    heatSpots = []
  }
  
  return([diveSpots, heatSpots])
}


export { dataParams, filterSites, filterHeat, setupMapValues };
