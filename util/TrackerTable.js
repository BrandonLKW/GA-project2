const url = "https://api.airtable.com/v0/appWZvsEwJf39rvPj/Tracker"
const token = "pat9S6BvHzANBKdhl.8c153b23367081b544a48b4910dc5b76502519217285ea80df57be6bbc439bd6";

export async function getTrackerList(){
    const response = await fetch(url, {
        headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
    });
    const data = await response.json();
    return data.records;
}

export async function addItem(item){
    const newItem = {
        fields: {
            "title": item.title,
            "salePrice": item.salePrice,
            "normalPrice": item.normalPrice,
            "gameID": item.gameID,
            "thumb": item.thumb
        },
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
    });
    const jsonData = await response.json();
    return jsonData;
}

export async function removeItem(itemId){
    const deleteUrl = url + "/" + itemId;
    const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    });
    const jsonData = await response.json();
    return jsonData;
}