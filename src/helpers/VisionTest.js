
const vision = require('@google-cloud/vision')

const creds = JSON.parse(JSON.stringify({
  "type": "service_account",
  "project_id": "wetmap-355400",
  "private_key_id": "a176914ccf760306b4fe1b6491b9c099dbecaf80",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1vUi+hi2JI4b1\n6QHYm2fBRZ/W8NpuPqJd4Fskj1GOYz0Q/yhPqE1s0yCGSes9JR3bZRscQyyVF1TK\nA78RussN7kNZ+ZpxvOQUXuOB8U9y9rNRTKBPV3pQPX84u2zqbO7xVoCxxMJIF5xN\nJ77pWoJimAnoZTXDL/1mugpTIN4hT2DhOC6iCnP5yw/qJMqN9+CbHlkscyvZIBdr\n0ij0W8Tk6p7froQyf9YuFgr5LvBWRJRo+PAWTogxQg0e9GgVXtPvcQbwan5p96Qm\nfwNjgIk5V6V+mfxLFcX4HZok818zFIqWqZphOnxlLYIXjammy6A6tn6XdgSbNlKB\nFMEeA65LAgMBAAECggEAFyFZIc6H+x1HbwLR1lSpFuMancuXsVJNbe9BCl0nPx0I\nR6KB6el8uS4BxLWht+2CaErs8WLnSK5ofzGM3t/MOiCp98iZzIIC8UjGYeJpfzNA\nzUcYXCDBE3dQOtM34Houyw58YKOvKme+398AIEkBsTSyhh5jgk0YTju9VqknPEvb\nvMrkdJfNAzrBrvhztvdjEVe1C3NEjSDfCIwiL+Af0Fhv6n7P9dG88+oMMXsGUl3S\n2QhtXAWHDTpKXlOF5MkWh/nrnVZteuXNWUGEztu3oh7x+QSku+Pg/64HzbmVyVki\nUDAKqbOiINqQzGxO7kCW/Q+SYr1p7BtTOI935lso8QKBgQDyTXGbTfczaAzGQnnK\nDCm7tMs0DzSFLvE+51Ty0TNky39efII8KsfSb0pGZ+gDPLWBoyqbU9ASgJH9JDmb\nax/0R0fc0zspQqrAVXOcQ/zdl808elf+yKpS/01upnfIX1vxkYYgzksNVfbNjGIl\nT88yIz13EZb7K4+QHcS4qW4emQKBgQDAA2HeQ0do3d2wJKQDkDotmAGdos5B+89j\nsRwcYvyuCr2W6NgMl21JhLJKVjBP+giyvhgKaRej260ouo55S/YISnHqorFZObzI\n1jRvjUCAc+JetJAjnLwEtcAyAhuZrvRtJtPF4a5nN9QKufi97leEDAnJ6j1NN+B7\nAJ4RbDv2gwKBgQCqa/v+3uyCtKlffPwKN1nXE0dlO1iWYDkAJFckXi4Gs/bG703u\noaxf/zS/pm+Sb02+e5QJIf8UNGf6I1N9U/BqsQQDdnKDB8fvdWrWOx+MgCuzYN2p\nb1wU+kptDBrtzNxvYQp04oP5QkBPvHB/i83Qluaxa6bEzJOyKq3lsA2q6QKBgDqE\njV4UeP3fqAFXmViwqtpcWhm1lVCMso66WkvYaxOLmG4WdkmYGKlwNHntPHoTRHVc\n86ywjJDWkTY5bNRQryGltoQAozYDH6LBjWd1z/OV3aZpNwhzauWwkmtrMwgqRrnB\nPIcxGVrBq/C87q7LpYZLuOv9ZENVRSeXb5T1vGyLAoGBAIsFYl+3L5P75guU/0pq\n2eIGox2NRC+WZ9nyU9+6x5NTEFoJRyl5YwST9XSyhPWerKMDfzvyQ2FFjc4uB+DS\nUx7FKIfOBFnPPgg7GzYMdmJCz6tmuQ5u70cJaDQlxHswRqn32cVkVoQPzsZ1ma6t\nAYPsz3u8QrC3LIIrgb+5ysUy\n-----END PRIVATE KEY-----\n",
  "client_email": "freem11@wetmap-355400.iam.gserviceaccount.com",
  "client_id": "107606544857359005447",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/freem11%40wetmap-355400.iam.gserviceaccount.com"
}))

const config = {
  credentials: {
    private_key : creds.private_key,
    client_email : creds.client_email
  }
}

const client = new vision.ImageAnnotatorClient(config)


const detectLabel = async(file_path) => {
  let [result] = await client.labelDetection('IMG_0288.JPG')
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description))
}

detectLabel()
