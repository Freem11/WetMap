function exifGSPHelper(file) {

  exifr.parse(file).then((output) => {
    if (output.GPSLatitude && output.GPSLongitude) {

      if (output.GPSLatitudeRef === "S") {
        lats =
          0 -
          (output.GPSLatitude[0] +
            output.GPSLatitude[1] / 60 +
            output.GPSLatitude[2] / 3600);
      } else {
        lats =
          output.GPSLatitude[0] +
          output.GPSLatitude[1] / 60 +
          output.GPSLatitude[2] / 3600;
      }

      if (output.GPSLongitudeRef === "W") {
        lngs =
          0 -
          output.GPSLongitude[0] +
          output.GPSLongitude[1] / 60 +
          output.GPSLongitude[2] / 3600;
      } else {
        lngs =
          output.GPSLongitude[0] +
          output.GPSLongitude[1] / 60 +
          output.GPSLongitude[2] / 3600;
      }
      
    } else {

      return (console.log("No GPS on this one!"));
    }

    return[lats, lngs]
    
  });

}