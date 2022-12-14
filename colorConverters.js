
function generateHexCode(){
    const hexCodeArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    let hexCode = '#'
    for(let i=0;i<6;i++){
        hexCode += hexCodeArray[Math.round(Math.random()*15)]
    }
    return hexCode
}

function getRGBFromHex(hexCode){
    const red = parseInt(hexCode.substring(1,3), 16)
    const green = parseInt(hexCode.substring(3,5), 16)
    const blue = parseInt(hexCode.substring(5,7), 16)
    return {red, green, blue, text:`rgb(${red}, ${green}, ${blue})`}
}

function getHSLFromHex(hexCode){
    const RGBCode = getRGBFromHex(hexCode)
    let red = RGBCode.red/255
    let green = RGBCode.green/255
    let blue = RGBCode.blue/255

    let max = Math.max(red, green, blue)
    let min = Math.min(red, green, blue)

    let hue, saturation, lightness = (max+min)/2

    if(max === min){
        hue = saturation = 0
    }
    else{
        let difference = max - min
        saturation = lightness > 0.5 ? difference/(2 - max - min) : difference/(max + min)
        switch(max){
            case red    :   hue = (green - blue)/difference + (green < blue ? 6 : 0); break;
            case green  :   hue = (blue - red)/difference + 2; break;
            case blue   :   hue = (red - green)/difference + 4; break;  
        }
        hue /= 6 
    }

    saturation *= 100
    saturation = Math.round(saturation)
    lightness *= 100
    lightness = Math.round(lightness)
    hue = Math.round(360*hue)

    return {hue, saturation, lightness, text:`hsl(${hue}, ${saturation}, ${lightness})`}
}

function getCMYKFromHex(hexCode){
    const RGBCode = getRGBFromHex(hexCode)
    let rgb = [RGBCode.red, RGBCode.green, RGBCode.blue]
	let b = 1;
	let cmyk = [] ;
	for (var i = 0; i < rgb.length; i++) {
		let color =  1 - ( rgb[i] / 255 );
		if	( color < b ) b = color;
		if ( b === 1 ) color = 1
		else color = ( ( color - b ) / ( 1 - b ) ) * 100 
		cmyk[i] = Math.round(color)
	}
	const k = Math.round(b * 100);
	cmyk.push(k)
    let [cyan, magenta, yellow, black] = cmyk
    return {cyan, magenta, yellow, black, text:`cymk(${cyan},${magenta},${yellow},${black})`}
}

export {generateHexCode, getRGBFromHex, getHSLFromHex, getCMYKFromHex}