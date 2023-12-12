const form = document.getElementById("form");

const urlParams = new URLSearchParams(window.location.search);

const region = urlParams.get('region').toLowerCase();

let svg = document.getElementById("mySVG")
svg.data = `http://192.168.7.165:2929/region_img/${region}.svg`;

// Get the SVG document
var svgObject = document.getElementById('mySVG');
var svgDocument;

svgObject.onload = () => {
    svgDocument = svgObject.getSVGDocument();

    originalWidth = svg.getBoundingClientRect().width;
    originalHeight = svg.getBoundingClientRect().height;

    scale = Math.min(800 / originalWidth, 800 / originalHeight);

    svg.style.transform = `scale(${scale})`;

}

const selectElement = document.getElementById("inputRegione");
for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value === region) {
        selectElement.options[i].selected = true;
        break;
    }
}


const searchKey = urlParams.get('searchKey').toLowerCase();
const type = urlParams.get('type').toLowerCase();

selectElement.onchange = () => {
    form.submit();
};

document.getElementById("inputText").setAttribute("value", searchKey);
form.addEventListener("keypress", (e) => {
    console.log(e);
    if (e.key == "Enter") {
        form.submit()
    }
})


setTimeout(() => {
    fetch(`/search_per_region?${type}=${searchKey.toUpperCase()}&region=${region}`).then((responce) => {
        responce.json().then((res) => {
            let tot = 0;
            let map = {};

            console.log(res);

            for (const iterator of res) {
                tot += iterator.count;
                if (!map[iterator.provincia]) {
                    map[iterator.provincia] = iterator.count
                } else {
                    map[iterator.provincia] += iterator.count
                }
            }

            for (const prov in map) {
                greenValue = Math.floor((255 * map[prov]) / tot);   
                greenValue = greenValue.toString(16);
                if (greenValue.length == 1) greenValue = "0" + greenValue
                svgDocument.children[0].querySelector(`g#${prov}`).style.fill = `#2c${greenValue}24`;
            }
            
        });
    })
}, 500);

