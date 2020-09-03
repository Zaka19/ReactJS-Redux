async function getJSON(url) {
    const res = await fetch(url);
 
    if (!res.ok) {
        throw new Error(res.status); // 404
    }
 
    const data = await res.json();
    return data;
}

async function AllJSON(url, obj, methods) {
    const options = {
        method: methods,
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url,options);
 
    if (!res.ok) {
        throw new Error(res.status); // 404
    }
 
    const data = await res.json();
    return data;
}
 
export {getJSON, AllJSON}