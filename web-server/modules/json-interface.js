const fs = require('fs');

// Search function
exports.searchByFile = (field, value, file) => {
    // Read the JSON file
    const rawdata = fs.readFileSync(file);
    const jsonData = JSON.parse(rawdata);

    const results = jsonData.filter(item => item[field] === value);
    return results;
}

exports.filterByField = (field, value, obj) => {
    const results = obj.filter(item => item[field] === value);
    return results;
}

exports.filterLikeByField = (field, value, obj) => {
    const results = obj.filter(item => item[field].includes(value));
    return results;
}