"use strict"
function task1(search, data) {
    // Cache - key based on search + hash data
    const cacheKey = JSON.stringify(search) + '_' + data.length;
    if (task1.cache && task1.cache.has(cacheKey)) {
        return task1.cache.get(cacheKey);
    }
    
    // Initialize cache if it doesn't exist
    if (!task1.cache) {
        task1.cache = new Map();
    }
    
    // Validation
    if (!data || data.trim() === '') {
        throw new Error("Data not found");
    }
    if (!search || typeof search !== "object" || Object.keys(search).length === 0) {
        throw new Error("Search criteria not found");
    }
    
    // Parsing
    const rows = data.trim().split('\n');
    const header = rows[0].split(',');
    const searchKeys = Object.keys(search);
    
    // Checking the keys
    for (const key of searchKeys) {
        if (!header.includes(key)) {
            throw new Error('Key mismatch');
        }
    }
    
    // Checking if 'value' exists
    const valueIndex = header.indexOf('value');
    if (valueIndex === -1) {
        throw new Error('Value column not found');
    }
    
    // Iterating through the data
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        let match = true;
        
        for (const key of searchKeys) {
            const keyIndex = header.indexOf(key);
            // console.log(row[keyIndex], search[key]);
            
            if (row[keyIndex] !== search[key] && row[keyIndex] !== 'ANY') {
                match = false;
                break;
            }
        }
        // If match found, cache and return the value
        if (match) {
            const result = row[valueIndex];
            task1.cache.set(cacheKey, result);
            return result;
        }
    }
    
    // If no match found, cache and return '-1'
    task1.cache.set(cacheKey, '-1');
    return '-1';
}

// Test
const data = 'side,currency,value\nIN,PLN,1\nIN,EUR,2\nOUT,ANY,3';
console.log(task1({'side': 'IN', 'currency': 'PLN'}, data) === '1'); // true
console.log(task1({'side': 'IN', 'currency': 'GBP'}, data) === '-1'); // true


