const url = "https://www.cheapshark.com/api/1.0"

export async function getDailyDeals(){
    const dailyDealsUrl = url + "/deals?storeID=1&upperPrice=15";
    const response = await fetch(dailyDealsUrl);
    const list = await response.json();
    return list;
}

export async function getFilteredDeals(filter){
    const filteredDealsUrl = url + "/deals?storeID=1&" + filter;
    const response = await fetch(filteredDealsUrl);
    const list = await response.json();
    return list;
}

export async function getGameDetails(gameId){
    const detailsUrl = url + "/games?id=" + gameId;
    const response = await fetch(detailsUrl);
    const list = await response.json();
    return list;
}

export async function getStoreList(){
    const storeUrl = url + "/stores";
    const response = await fetch(storeUrl);
    const list = await response.json();
    return list;
}