async function getJSON(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(res.status); // 404
    }

    const data = await res.json();
    return data;
}

async function postJSON(url, obj, methods) {
    const options = {
        method: methods,
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(res.status); // 404
    }

    try {

        const data = await res.json();
        return data;

    }
    catch (Error) {
        console.log("Es un put");
    }
}

async function RemoveJSON(url) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(res.status); // 404
    }

    const data = await res.json();
    return data;
}

export { getJSON, postJSON, RemoveJSON }