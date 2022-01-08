// import { 
//     PNG_SIGNATURE,
//     IHDR_SIGNATURE,
//     SIGNATURE,
//     CHUNK_SIZE,
//     META_SIZE,
//     CHUNK_SIGNATURE_TYPE
// } from "./constants";

export const readFileAsDataURL = async file => {
    return new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = () => {
            console.error(fileReader.error)
            resolve(false);
        }
    })
}

export function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}


// export const convertImageToTextArt = async file => {
//     let byteArray = await convertFileToByteArray(file);
//     if(verifyPngSignature(byteArray) === false) {
//         console.log("not a png, need to convert")
//     } 
//     let metaChunks = retrieveMetaChunks(byteArray)
//     return metaChunks
// }

// export const convertFileToByteArray = async file => {
//     return new Promise(resolve => {
//         let fileReader = new FileReader();
//         fileReader.readAsArrayBuffer(file);
//         fileReader.onload = () => {
//             resolve(new Uint8Array(fileReader.result));
//         }
//         fileReader.onerror = () => {
//             console.error(fileReader.error)
//             resolve(false);
//         }
//     })
//     // let something = ["░", "▒", "▒", "▓", "█"]     ["⬜","⬛"]
// }

// export const verifyPngSignature = byteArray => {
//     for (let i = 0; i < PNG_SIGNATURE.length; i++) {  
//         if (byteArray[i] !== PNG_SIGNATURE[i]) {
//             return false;
//         }
//     }
//     return true;
// }

// const bytesToUint32 = (byteArray, start, count) => { 
//     const MAX_SIGNIFICANT_SIZE = 127;
//     if (count > 4) {
//         throw new Error('Length cannot be greater than 4');
//     }

//     let position = start;
//     let value = 0;

//     if (count === 4) {
//         let sigValue = byteArray[position];

//         if (sigValue > MAX_SIGNIFICANT_SIZE) {
//             value += MAX_SIGNIFICANT_SIZE << 24;
//             sigValue -= MAX_SIGNIFICANT_SIZE;
//         }
//         value += sigValue << 24;
//         position++;
//     }

//     for (let i = position; i < start + count; i++) {
//         value += byteArray[i] << (8 * (count - (i - start) - 1));
//     }

//     return value;
// }

// function bytesToString(byteArray, start, count) {
//     let result = '';
//     for (let i = start; i < start + count; i++) {
//       const byte = byteArray[i];
  
//       if (byte === 0) {
//         result += '00';
//       } else if (byte < 10) {
//         result += `0${byte.toString()}`;
//       } else {
//         result += byte.toString();
//       }
//     }
  
//     return result;
// }

// function retrieveMetaChunks(byteArray) {
//     const chunks = {};
//     let lastChunk = null;
//     let i = PNG_SIGNATURE.length; // skip the PNG signature
//     while (i < byteArray.byteLength) {
//         const dataLength = bytesToUint32(byteArray, i, META_SIZE);
        
//         i += META_SIZE;
//         const signature = bytesToString(byteArray, i, META_SIZE);
//         const type = CHUNK_SIGNATURE_TYPE[signature];
//         console.log(signature)
//         i += META_SIZE;
//         const dataStart = i;

//         i += dataLength;
//         const crc = bytesToUint32(byteArray, i, META_SIZE);

//         i += META_SIZE;

//         const meta = {
//             type,
//             signature,
//             crc,
//             data: { start: dataStart, length: dataLength }
//         };

//         if(type) {
//             lastChunk = type;
//             if(!chunks[type]) chunks[type] = [];
//             chunks[type].push(meta);
//         }
//     }
  
//     // if (lastChunk !== 'IEND') {
//     //   throw new Error('Last chunk must be IEND');
//     // }
  
//     return chunks;
// }